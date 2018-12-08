declare interface IQuery extends IMinecraftObject {
    /**
     * The type of the object
     */
    readonly __type__: EntityType.Query;

    /**
     * READ ONLY. This is the unique identifier of the query
     */
    readonly id: number;
}