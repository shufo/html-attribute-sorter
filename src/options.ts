export type Strategy =
    | "alphabetical"
    | "code-guide"
    | "idiomatic"
    | "vuejs"
    | "custom";

export interface ISortOption {
    order: Strategy;
    customRegexes?: string[];
}
