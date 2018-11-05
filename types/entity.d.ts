declare interface IEntityObject {
    id: number;

    /**
     * The identifier of the entity, e.g., "minecraft:sheep", or "minecraft:pumpkin_seeds"
     * @deprecated this is not meant to be public, but it is currently the only way to get the identifier of an item
     */
    __identifier__: string;

    /**
     * The type of the entity
     * @deprecated this is not meant to be public, but it is currently the only way to determine if something is an item
     */
    __type__: EntityType;
}

declare const enum EntityType {
    Entity = "entity",
    ItemEntity = "item_entity"
}