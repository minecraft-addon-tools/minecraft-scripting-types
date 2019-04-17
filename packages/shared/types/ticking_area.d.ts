type ITickingArea = IEntityTickingArea | ILevelTickingArea;

declare interface IEntityTickingArea {
    /**
     * The type of the object
     */
    readonly __type__: "entity_ticking_area";

    /**
     * The unique identifier of the ticking area
     */
    readonly entity_ticking_area_id: number;
}

declare interface ILevelTickingArea {
    /**
     * The type of the object
     */
    readonly __type__: "level_ticking_area";

    /**
     * The unique identifier of the ticking area
     */
    readonly level_ticking_area_id: number;
}
