declare interface IEntity {
    /**
     * READ ONLY. The type of the entity
     */
    readonly __type__: "entity" | "item_entity";

    /**
     * The identifier of the entity, e.g., "minecraft:sheep", or "minecraft:pumpkin_seeds"
     */
    readonly __identifier__: string;

    /**
     * READ ONLY. This is the unique identifier of the query
     */
    readonly id: number;
}
