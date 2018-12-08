/// <reference path="minecraft_object.d.ts" />

declare interface IEntityObject extends IMinecraftObject {
    /**
     * READ ONLY. The type of the entity
     */
    readonly __type__: EntityType.Entity | EntityType.ItemEntity;

    /**
     * READ ONLY. This is the unique identifier of the query
     */
    readonly id: number;
}

declare const enum EntityType {
    Entity = "entity",
    ItemEntity = "item_entity",
    Level = "level",
    Component = "component",
    Query = "query"
}