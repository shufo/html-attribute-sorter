import { expect, test } from "@jest/globals";

import { sortHtmlAttributes } from "../src/twig";

test("sorts attributes alphabetically", () => {
    expect(sortHtmlAttributes('<div class="a" id="b">')).toBe('<div class="a" id="b">');

    expect(sortHtmlAttributes('<div id="b" class="a">')).toBe(
        '<div class="a" id="b">'
    );

    // The self-close slash sits behind values that themselves hold
    // slashes; sorting must not stop at the first one.
    expect(sortHtmlAttributes('<img src="a.png" alt="b" />')).toBe(
        '<img alt="b" src="a.png" />'
    );
});

test("keeps Twig inside quoted values intact", () => {
    const template = '<a href="{{ page.url|trim(\'/\') }}" title="Page">';

    expect(sortHtmlAttributes(template)).toBe(
        '<a href="{{ page.url|trim(\'/\') }}" title="Page">'
    );
});

test("keeps conditional Twig attribute blocks untouched", () => {
    const template = '<a{% if is_active %} class="active"{% endif %}>';

    expect(sortHtmlAttributes(template)).toBe(template);
});

test("multi-line tags keep their shape", () => {
    const template = [
        '<img',
        '  alt="An image"',
        '  class="photo"',
        '  src="/photo.jpg">',
    ].join("\n");

    expect(sortHtmlAttributes(template)).toBe(
        [
            '<img',
            '  alt="An image"',
            '  class="photo"',
            '  src="/photo.jpg">',
        ].join("\n")
    );

    const unsorted = ["<img", '  src="/photo.jpg"', '  alt="An image">'].join(
        "\n"
    );

    expect(sortHtmlAttributes(unsorted)).toBe(
        ["<img" + ' alt="An image"', '  src="/photo.jpg">'].join("\n")
    );
});

test("closes multi-line self-closing tags correctly", () => {
    const unsorted = [
        '<img',
        '  src="/photo.jpg"',
        '  alt="An image"',
        '/>',
    ].join("\n");

    expect(sortHtmlAttributes(unsorted)).toBe(
        ["<img" + ' alt="An image"', '  src="\u002Fphoto.jpg" />'].join("\n")
    );
});

test("skips comments and closing tags", () => {
    const template = [
        '<!-- a comment with > inside -->',
        '</div>',
        '<p id="b" class="a">',
    ].join("\n");

    expect(sortHtmlAttributes(template)).toBe(
        [
            '<!-- a comment with > inside -->',
            '</div>',
            '<p class="a" id="b">',
        ].join("\n")
    );
});

test("sorting is case-insensitive and byte-wise", () => {
    expect(sortHtmlAttributes('<span data-x="1" aria-hidden="true">')).toBe(
        '<span aria-hidden="true" data-x="1">'
    );
    expect(sortHtmlAttributes('<span Bar="1" allcaps="2">')).toBe(
        '<span allcaps="2" Bar="1">'
    );
});

test("the scanner is idempotent", () => {
    const template = [
        '<a',
        '  class="link"',
        '  href="/nowhere"',
        '  rel="noopener">',
    ].join("\n");

    expect(sortHtmlAttributes(sortHtmlAttributes(template))).toBe(
        sortHtmlAttributes(template)
    );
});