declare interface IEntityObject {
    id: string;
    __identifier__: string;
    __type__: EntityType;
}

declare const enum EntityType {
    Entity = "entity",
    ItemEntity = "item_entity"
}