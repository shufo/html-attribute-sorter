import { ISortOption, Strategy } from "./options";
import { Sorter } from "./sorter";
import { AlphabeticalStrategy } from "./strategy/alphabetical";
import { CodeGuideStrategy } from "./strategy/code-guide";
import { CustomStrategy } from "./strategy/custom";
import { IdiomaticStrategy } from "./strategy/idiomatic";
import { VuejsStrategy } from "./strategy/vuejs";

const maps: Array<string> = [];
const attrs: Array<string> = [];

export function sortAttributes(
    html: string,
    options: ISortOption = { order: "code-guide" }
) {
    const replaced = html.replace(
        // capture html tags
        /<(?!\/)[-:.\w\d@]+\s(?:"[^"]*"|'[^']*'|[^"'])*?>/g,
        (match: string) => {
            return storeTags(match);
        }
    );

    return restoreAttributes(replaced, options);
}

function storeTags(value: string) {
    const index = maps.push(value) - 1;
    return getTagPlaceholder(index.toString());
}

function storeAttributes(name: string, value: string) {
    const index = attrs.push(value) - 1;
    return getAttributePlaceholder(name, index.toString());
}

function getTagPlaceholder(index: string) {
    return `___sort_tags_#___`.replace("#", index);
}

function getAttributePlaceholder(name, index: string) {
    return `${name}_attrs_#___`.replace("#", index);
}

function restoreAttributes(content: string, options: ISortOption) {
    return content.replace(
        /___sort_tags_(\d+)___/g,
        (_match: string, p1: string) => {
            const matched = maps[p1];
            const replaced = matched.replace(
                // capture attributes
                /([-:.\w\d]+)\s*=\s*("[^"]*"|'[^']*'|[^"'>\s]+)/g,
                (match: string, p1: string) => storeAttributes(p1, match)
            );
            const sorted = _sortAttributes(replaced, options);
            const restored = sorted.replace(
                /[-:.\w\d]+?_attrs_(\d+)___/g,
                (_match, p1) => attrs[p1]
            );

            return restored;
        }
    );
}

function _sortAttributes(content: string, options: ISortOption): string {
    const strategy = getSortStrategy(options);
    const sorter = new Sorter(strategy);

    return content.replace(/(?<=<[-:.\w\d]+\s)[^>]*?(?=\/?>)/g, (match) => {
        const splitted = match.split(/\s/);
        const filtered = splitted.filter((x) => x.length > 0);
        const sorted = sorter.sort(filtered);
        return sorted.join(" ");
    });
}

function getSortStrategy(options: ISortOption) {
    switch (options.order) {
        case "alphabetical":
            return new AlphabeticalStrategy();
        case "code-guide":
            return new CodeGuideStrategy();
        case "idiomatic":
            return new IdiomaticStrategy();
        case "vuejs":
            return new VuejsStrategy();
        case "custom":
            return new CustomStrategy(options);
    }

    throw new Error(
        `You can specify only [alphabetical|code-guide|idiomatic|vuejs] for sorting order`
    );
}
