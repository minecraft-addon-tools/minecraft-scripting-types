declare const enum BroadcastableClientEvent {
    ExecuteCommand = "minecraft:execute_command",
    DisplayChat = "minecraft:display_chat_event",
    LoadUI = "minecraft:load_ui",
    SendUIEvent = "minecraft:send_ui_event",
    SpawnParticleAttachedEntity = "minecraft:spawn_particle_attached_entity",
    SpawnParticleInWorld = "minecraft:spawn_particle_in_world",
    UnloadUI = "minecraft:unload_ui"
}

declare const enum BroadcastableServerEvent {
    DisplayChat = "minecraft:display_chat_event",
    ExecuteCommand = "minecraft:execute_command",
    SpawnParticleAttachedEntity = "minecraft:spawn_particle_attached_entity",
    SpawnParticleInWorld = "minecraft:spawn_particle_in_world",
}
    
declare const enum MinecraftClientEvent {
    ClientEnteredWorld = "minecraft:client_entered_world",
    HitResultChanged = "minecraft:hit_result_changed",
    HitResultContinuous = "minecraft:hit_result_continuous",
    PickHitResultChanged = "minecraft:pick_hit_result_changed",
    PickHitResultContinuous = "minecraft:pick_hit_result_continuous",
    UIEvent = "minecraft:ui_event"
}

declare const enum MinecraftServerEvent {
    EntityCreated = "minecraft:entity_created",
    EntityDeath = "minecraft:entity_death",
    EntityStartRiding = "minecraft:entity_start_riding",
    EntityStopRiding = "minecraft:entity_stop_riding",
    EntityTick = "minecraft:entity_tick",
    PlayerAttackedActor = "minecraft:player_attacked_actor"
}

declare const enum MinecraftDimension {
    Overworld = "overworld",
    Nether = "nether",
    End = "the end"
}

declare type Dimension = MinecraftDimension | string;
declare type Vector = [number, number, number];
declare type EntityId = number;