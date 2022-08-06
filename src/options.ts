export type Strategy = "alphabetical" | "code_guide" | "idiomatic" | "vuejs";

export interface ISortOption {
    order: Strategy;
}
