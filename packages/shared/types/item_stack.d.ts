declare interface IItemStack {
    /**
     * The type of the object
     */
    readonly __type__: "item_stack";

    /**
     * The identifier of the item stack
     */
    readonly __identifier__: string;

    /**
     * The identifier of the item
     */
    readonly item: string;

    /**
     * The number of items in the stack
     */
    readonly count: number;
}