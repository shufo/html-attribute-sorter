import { SortStrategy } from "../sorter";

export class AlphabeticalStrategy implements SortStrategy {
    sort(attributes: string[]): string[] {
        return attributes.sort();
    }
}
