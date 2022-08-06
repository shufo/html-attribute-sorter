import { SortStrategy } from "../sorter";

/**
 * Idiomatic strategy
 * see: https://github.com/necolas/idiomatic-html#attribute-order
 */
export class IdiomaticStrategy implements SortStrategy {
    private orderedAttrsRegex = ["class", "id", "data-.+"];

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
