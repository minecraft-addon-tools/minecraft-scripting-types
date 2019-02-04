declare const enum MinecraftDimension {
    Overworld = "overworld",
    Nether = "nether",
    End = "the end"
}

declare type Dimension = MinecraftDimension | string;
declare type EntityId = number;