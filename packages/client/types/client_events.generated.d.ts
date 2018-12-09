/**
 * (Client-side) Events that can be sent to Minecraft to achieve an effect. 
 */
declare const enum SendToMinecraftClient {
    ExecuteCommand = "minecraft:execute_command",
    DisplayChat = "minecraft:display_chat_event",
    LoadUI = "minecraft:load_ui",
    SendUIEvent = "minecraft:send_ui_event",
    SpawnParticleAttachedEntity = "minecraft:spawn_particle_attached_entity",
    SpawnParticleInWorld = "minecraft:spawn_particle_in_world",
    UnloadUI = "minecraft:unload_ui"
}

/**
 * (Client-side) Events that can be received from Minecraft
 */
declare const enum ReceiveFromMinecraftClient {
    ClientEnteredWorld = "minecraft:client_entered_world",
    HitResultChanged = "minecraft:hit_result_changed",
    HitResultContinuous = "minecraft:hit_result_continuous",
    PickHitResultChanged = "minecraft:pick_hit_result_changed",
    PickHitResultContinuous = "minecraft:pick_hit_result_continuous",
    UIEvent = "minecraft:ui_event"
}

declare interface IUIEventParameters {
    /**
     * The name of the UI event
     */
    eventName: string;
    /**
     * The data for the UI event being triggered
     */
    data: string;
}

declare interface IClientEnteredWorldParameters {
    /**
     * The player entering the world
     */
    player: IEntityObject;
}

declare interface ISpawnParticleAttachedEntityParameters {
    /**
     * The identifier of the particle effect you want to attach to the entity. This is the same name you gave the effect in its JSON file
     */
    effect: ParticleEffect;
    /**
     * The entity object you want to attach the effect to
     */
    entity: IEntityObject;
    /**
     * The offset from the entity's "center" where you want to spawn the effect
     */
    offset: Vector;
}


declare interface IClientSpawnParticleInWorldParameters {
    /**
     * The identifier of the particle effect you want to attach to spawn. This is the same name you gave the effect in its JSON file
     */
    effect: ParticleEffect;
    /**
     * The position in the world where you want to spawn the effect
     */
    position: Vector;
}


declare interface IHitResultChangedEvent {
    /**
     * The enity that was hit or null if it fired when moving off of an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or null if it fired when moving off an entity
     */
    position: VectorXYZ | null
}

declare interface IHitResultContinuousEvent {
    /**
     * The enity that was hit or null if it not pointing at an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or block that was hit
     */
    position: VectorXYZ
}

declare interface IPickHitResultChangedEvent {
    /**
     * The enity that was hit or null if it fired when moving off of an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or null if it fired when moving off an entity
     */
    position: VectorXYZ | null
}

declare interface IPickHitResultContinuousEvent {
    /**
     * The enity that was hit or null if it not pointing at an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or block that was hit
     */
    position: VectorXYZ
}