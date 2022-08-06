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
    // eslint-disable-next-line
    private OTHER_DIRECTIVES = ["v-[-:wd]+"];
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
        ...this.OTHER_DIRECTIVES,
    ];

    private tailOrderedAttrsRegex = [...this.EVENTS, ...this.CONTENT];

    sort(attributes: string[]): string[] {
        const head: string[] = [];
        const tail: string[] = [];

        this.headingOrderedAttrsRegex.forEach((regex) => {
            attributes.forEach((attr) => {
                if (new RegExp(`^${regex}`).test(attr)) {
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

        return head.concat(remainings).concat(tail);
    }
}
