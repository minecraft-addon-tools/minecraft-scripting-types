declare interface IEventData<T> {
    /**
     * The type of the object
     */
    readonly __type__: "event_data";

    /**
     * The identifier of the event
     */
    readonly __identifier__: string;

    data: T;
}

// TODO: move this stuff somewhere else
declare const enum MinecraftDimension {
    Overworld = "overworld",
    Nether = "nether",
    End = "the end"
}

declare type Dimension = MinecraftDimension | string;
declare type EntityId = number;