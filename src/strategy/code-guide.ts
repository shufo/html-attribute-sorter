import { SortStrategy } from "../sorter";

/**
 * Code guide strategy
 * see: https://codeguide.co/
 */
export class CodeGuideStrategy implements SortStrategy {
    private orderedAttrsRegex = [
        "class",
        "id",
        "name",
        "data-.+",
        "ng-.+",
        "src",
        "for",
        "type",
        "href",
        "value",
        "values",
        "title",
        "alt",
        "role",
        "aria-.+",
        "tabindex",
        "style",
    ];

    sort(attributes: string[]): string[] {
        const sorted: string[] = [];

        this.orderedAttrsRegex.forEach((regex) => {
            attributes.forEach((attr) => {
                if (new RegExp(`^${regex}`).test(attr)) {
                    sorted.push(attr);
                }
            });
        });

        const remainings = attributes.filter(
            (attr) => sorted.indexOf(attr) === -1
        );

        return sorted.concat(remainings);
    }
}
