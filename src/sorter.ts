export interface SortStrategy {
    sort(attributes: string[]): string[];
}

export class Sorter {
    private strategy: SortStrategy;

    constructor(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    public sort(attributes: string[]): string[] {
        return this.strategy.sort(attributes);
    }
}
