declare interface IMinecraftObject {
    /**
     * The identifier of the entity, e.g., "minecraft:sheep", or "minecraft:pumpkin_seeds"
     */
    readonly __identifier__: string;

    /**
     * The type of the entity
     */
    readonly __type__: EntityType;
}
