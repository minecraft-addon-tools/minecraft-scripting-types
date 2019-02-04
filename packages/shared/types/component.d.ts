declare interface IComponent<T> {
    /**
     * The type of the object
     */
    readonly __type__: "component";

    /**
     * The identifier of the component, e.g., "minecraft:position", or "minecraft:nameable"
     */
    readonly __identifier__: string;

    data: T;
}
