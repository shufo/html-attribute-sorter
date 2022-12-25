import { SortStrategy } from "../sorter";

/**
 * vuejs order
 * see: https://eslint.vuejs.org/rules/attributes-order.html
 */
export class VuejsStrategy implements SortStrategy {
    private DEFINITION = ["is", "v-is"];
    private LIST_RENDERING = ["v-for"];
    private CONDITIONALS = ["v-if", "v-else-if", "v-else", "v-show", "v-cloak"];
    private RENDER_MODIFIERS = ["v-once", "v-pre"];
    private GLOBAL = ["id"];
    private UNIQUE = ["ref", "key"];
    private SLOT = ["v-slot", "slot"];
    private TWO_WAY_BINDING = ["v-model"];
    private OTHER_DIRECTIVES = /v-[-:\w\d]+/g;
    private EVENTS = ["@click", "v-on="];
    private CONTENT = ["v-text", "v-html"];

    private headingOrderedAttrsRegex = [
        ...this.DEFINITION,
        ...this.LIST_RENDERING,
        ...this.CONDITIONALS,
        ...this.RENDER_MODIFIERS,
        ...this.GLOBAL,
        ...this.UNIQUE,
        ...this.SLOT,
        ...this.TWO_WAY_BINDING,
    ];

    private tailOrderedAttrsRegex = [...this.EVENTS, ...this.CONTENT];

    sort(attributes: string[]): string[] {
        const head: string[] = [];
        const tail: string[] = [];

        this.headingOrderedAttrsRegex.forEach((regex) => {
            attributes.forEach((attr) => {
                if (
                    new RegExp(`^${regex}(_attrs_\\d+___)?$`, "gm").test(attr)
                ) {
                    head.push(attr);
                }
            });
        });

        this.tailOrderedAttrsRegex.forEach((regex) => {
            attributes.forEach((attr) => {
                if (new RegExp(`^${regex}`).test(attr)) {
                    tail.push(attr);
                }
            });
        });

        const remainings = attributes
            .filter((attr) => head.indexOf(attr) === -1)
            .filter((attr) => tail.indexOf(attr) === -1);

        const customDirectives: string[] = remainings.filter((attr) =>
            this.OTHER_DIRECTIVES.test(attr)
        );

        const remainingsWithoutCustomDirective = remainings.filter(
            (attr) => customDirectives.indexOf(attr) === -1
        );

        return head
            .concat(customDirectives)
            .concat(remainingsWithoutCustomDirective)
            .concat(tail);
    }
}
