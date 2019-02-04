declare interface IQuery {
    /**
     * The type of the object
     */
    readonly __type__: "query";

    /**
     * READ ONLY. This is the unique identifier of the query
     */
    readonly query_id: number;
}