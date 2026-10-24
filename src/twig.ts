
// Twig-aware alphabetical attribute sorting for HTML/Twig templates.

// One opening tag at a time is parsed with a character scanner that
// tracks Twig constructs ({% ... %}/{{ ... }}) and both quoting styles;
// an attribute value may contain either or both (e.g.
// href="{{ page.url|trim('/') }}" and content="{{ page.date|date("c")
// }}"), and the attr list is split on whitespace only outside them, so
// values containing Twig survive intact.
//
// Tags whose Twig sits outside quoted values (conditional attribute
// blocks like <a{% if is_active %}...>) are left untouched: their order
// is deliberate and they are not parseable as plain attributes.
//
// Multi-line tags keep the same shape (first attribute on the opening
// line, one attribute per continuation line at the original indent), so
// the djlint -> sorter chain settles instead of oscillating.

function findTagEnd(text: string, start: number): number | null {
    // start = index of '<'. Returns the index just after the closing '>',
    // or null when unbalanced.
    let twigDepth = 0;
    let quote: string | null = null;

    for (let i = start; i < text.length; i++) {
        const char = text[i];

        if (twigDepth > 0) {
            if (quote !== null) {
                if (char === "\\") {
                    i++; // skip escaped character inside a Twig string
                    continue;
                }
                if (char === quote) quote = null;
                continue;
            }
            if (char === '"' || char === "'") {
                quote = char;
                continue;
            }
            if ((char === "}" || char === "%") && text[i + 1] === "}") {
                twigDepth--;
                i++;
                continue;
            }
            continue;
        }

        if (quote !== null) {
            if (char === "\\") {
                i++;
                continue;
            }
            if (char === quote) quote = null;
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }
        if (char === "{" && (text[i + 1] === "{" || text[i + 1] === "%")) {
            twigDepth++;
            i++;
            continue;
        }
        if (char === ">") {
            return i + 1;
        }
    }
    return null;
}

const TAG_HEAD = /^<([a-zA-Z][^\s/>]*)/;
const SELF_CLOSE = /\/\s*>$/;

// Split a tag's attribute region into attribute pieces on whitespace
// that is outside quotes and outside Twig constructs. Each piece keeps
// its full source text (the name glued to its value).
function splitAttrs(tag: string): string[] | null {
    const head = TAG_HEAD.exec(tag);
    if (head === null) return null;

    const trimmed = tag.trimEnd();
    // The self-close slash is the tag's final one: earlier slashes may
    // sit inside quoted values (e.g. src="/photo.jpg").
    const bodyEnd = SELF_CLOSE.test(trimmed) ? trimmed.lastIndexOf("/") : tag.length - 1;
    let twigDepth = 0;
    let quote: string | null = null;
    let piece = "";
    const pieces: string[] = [];

    for (let i = head[0].length; i < bodyEnd; i++) {
        const char = tag[i];

        if (twigDepth > 0) {
            piece += char;
            if (quote !== null) {
                if (char === "\\") {
                    piece += tag[++i] ?? "";
                    continue;
                }
                if (char === quote) quote = null;
                continue;
            }
            if (char === '"' || char === "'") {
                quote = char;
                continue;
            }
            if ((char === "}" || char === "%") && tag[i + 1] === "}") {
                twigDepth--;
                i++;
            }
            continue;
        }

        if (quote !== null) {
            piece += char;
            if (char === "\\") {
                piece += tag[++i] ?? "";
                continue;
            }
            if (char === quote) {
                quote = null;
            } else if (char === "{" && (tag[i + 1] === "{" || tag[i + 1] === "%")) {
                // Consume the whole pair: the for loop's own increment
                // would otherwise drop the second brace from the piece.
                piece += tag[i + 1];
                twigDepth++;
                i++;
            }
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            piece += char;
            continue;
        }
        if (char === "{" && (tag[i + 1] === "{" || tag[i + 1] === "%")) {
            twigDepth++;
            i++;
            piece += char + tag[i];
            continue;
        }
        if (/\s/.test(char)) {
            if (piece !== "") {
                pieces.push(piece);
                piece = "";
            }
            continue;
        }
        piece += char;
    }
    if (piece !== "" && piece.trim() !== "/") pieces.push(piece);

    return pieces.length > 0 ? pieces : null;
}

function isSortedByName(pieces: string[]): boolean {
    for (let i = 1; i < pieces.length; i++) {
        const prev = attrName(pieces[i - 1]);
        const curr = attrName(pieces[i]);
        // Byte-wise order, as stylelint-order's alphabetical sorting uses.
        if (prev > curr) return false;
    }
    return true;
}

function attrName(piece: string): string {
    return piece.split("=")[0].toLowerCase();
}

const singleLineIndent = "  ";

function hasTwigOutsideQuotes(tag: string): boolean {
    let quote: string | null = null;
    let twigDepth = 0;

    for (let i = 0; i < tag.length; i++) {
        const char = tag[i];

        if (twigDepth > 0) {
            if (quote !== null) {
                if (char === "\\") {
                    i++;
                    continue;
                }
                if (char === quote) quote = null;
                continue;
            }
            if (char === '"' || char === "'") {
                quote = char;
                continue;
            }
            if ((char === "}" || char === "%") && tag[i + 1] === "}") {
                twigDepth--;
                i++;
                continue;
            }
            continue;
        }

        if (quote !== null) {
            if (char === "\\") {
                i++;
                continue;
            }
            if (char === quote) {
                quote = null;
                continue;
            }
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }
        if (char === "{" && (tag[i + 1] === "{" || tag[i + 1] === "%")) {
            if (twigDepth === 0 && quote === null) return true;
            twigDepth++;
            i++;
        }
    }
    return false;
}

// Rebuild an opening tag with its attributes in sorted order.
//
// Multi-line tags keep djlint's layout: the first attribute stays on the
// opening line, every further attribute gets its own continuation line
// at its original indentation, and the '>' (or '/>') closes the last
// line.
function rewriteTag(tag: string, pieces: string[]): string {
    const head = TAG_HEAD.exec(tag) as RegExpExecArray;
    const tagname = head[0];
    const selfClosing = SELF_CLOSE.test(tag.trimEnd());
    const multiline = tag.includes("\n");

    const ordered = pieces
        .map((piece, index) => ({ piece, index }))
        .sort((x, y) =>
            attrName(x.piece) !== attrName(y.piece)
                ? attrName(x.piece) < attrName(y.piece)
                    ? -1
                    : 1
                : x.index - y.index,
        )
        .map(({ piece }) => piece);

    if (!multiline) {
        return `${tagname} ${ordered.join(" ")}${selfClosing ? " />" : ">"}`;
    }

    const continuationIndent = tag
        .slice(head[0].length)
        .split("\n")
        .find((line) => line.trim() !== "")
        ?.match(/^\s*/)?.[0];

    const suffix = selfClosing ? " />" : ">";
    const lines: string[] = [`${tagname} ${ordered[0]}`];
    for (const piece of ordered.slice(1)) {
        lines.push(`${continuationIndent ?? singleLineIndent}${piece}`);
    }
    lines[lines.length - 1] += suffix;
    return lines.join("\n");
}

// Sorts the attributes of every opening tag in an otherwise-unformatted
// HTML/Twig template alphabetically.
export function sortHtmlAttributes(text: string): string {
    let result = "";
    let cursor = 0;

    // Opening tags: '<' followed by a letter, not '</', not '<!--'.
    const isOpeningTag = /<[a-zA-Z]/;

    while (cursor < text.length) {
        const next = text.indexOf("<", cursor);
        if (next === -1 || next === text.length) {
            result += text.slice(cursor);
            break;
        }

        if (next + 1 < text.length && text[next + 1] === "/") {
            // Closing tag: copy through to '>' and skip.
            const end = text.indexOf(">", next);
            if (end === -1) {
                result += text.slice(cursor);
                break;
            }
            result += text.slice(cursor, end + 1);
            cursor = end + 1;
            continue;
        }

        if (next + 3 < text.length && text.startsWith("<!--", next)) {
            const end = text.indexOf("-->", next);
            result += text.slice(cursor, end === -1 ? text.length : end + 3);
            cursor = end === -1 ? text.length : end + 3;
            continue;
        }

        if (!isOpeningTag.test(text.slice(next, next + 2))) {
            result += text.slice(cursor, next + 1);
            cursor = next + 1;
            continue;
        }

        const end = findTagEnd(text, next);
        if (end === null) {
            // Unbalanced — copy the rest verbatim.
            result += text.slice(cursor);
            break;
        }

        const tag = text.slice(next, end);

        if (hasTwigOutsideQuotes(tag)) {
            // Conditional attribute blocks must keep their order and are
            // not parseable as attributes — untouched.
            result += text.slice(cursor, next) + tag;
            cursor = end;
            continue;
        }

        const pieces = splitAttrs(tag);
        if (pieces === null || isSortedByName(pieces)) {
            // djlint-canonical multi-line tags stay byte-for-byte when
            // their attribute order is already sorted, so the chain
            // settles.
            result += text.slice(cursor, next) + tag;
            cursor = end;
            continue;
        }

        result += text.slice(cursor, next) + rewriteTag(tag, pieces);
        cursor = end;
    }

    return result;
}