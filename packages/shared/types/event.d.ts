declare const enum MinecraftDimension {
    Overworld = "overworld",
    Nether = "nether",
    End = "the end"
}

declare type Dimension = MinecraftDimension | string;
declare type Vector = [number, number, number];
declare type EntityId = number;