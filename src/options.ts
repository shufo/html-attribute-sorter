export type Strategy = "alphabetical" | "code-guide" | "idiomatic" | "vuejs";

export interface ISortOption {
    order: Strategy;
}
