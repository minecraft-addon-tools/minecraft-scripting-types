declare type VectorArray = [number, number, number];

declare interface VectorXYZ {
    x: number;
    y: number;
    z: number;
}

declare interface Range {
    range_min: number;
    range_max: number;
}

declare interface Int64 {
    "64bit_low": number;
    "64bit_high": number;
}

declare interface MinecraftTrigger {
    event: string;
    filters: MinecraftFilter;
    target: string;
}

declare interface MinecraftFilter {
    all_of?: MinecraftFilter[];
    any_of?: MinecraftFilter[];

    test?: string;
    subject?: "other" | "parent" | "player" | "self" | "target";
    operator?: "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
    domain?: string;
    value?: any;
}
