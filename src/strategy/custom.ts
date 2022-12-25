import { ISortOption } from "../options";
import { SortStrategy } from "../sorter";

/**
 * Custom order strategy
 */
export class CustomStrategy implements SortStrategy {
    private orderedAttrsRegex: string[] = [];

    public constructor(options: ISortOption) {
        if (options.customRegexes === undefined) {
            throw new Error(
                "customRegexes is empty. You must specify custom order to use custom strategy"
            );
        }

        this.orderedAttrsRegex = options.customRegexes;
    }

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
