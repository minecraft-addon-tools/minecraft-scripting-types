/**
 * (Server-side) Events that can be sent to Minecraft to achieve an effect. 
 */
declare const enum SendToMinecraftServer {
    DisplayChat = "minecraft:display_chat_event",
    ExecuteCommand = "minecraft:execute_command",
    SpawnParticleAttachedEntity = "minecraft:spawn_particle_attached_entity",
    SpawnParticleInWorld = "minecraft:spawn_particle_in_world",
}

/**
 * (Server-side) Events that can be received from Minecraft
 */
declare const enum ReceiveFromMinecraftServer {
    EntityCreated = "minecraft:entity_created",
    EntityDeath = "minecraft:entity_death",
    EntityStartRiding = "minecraft:entity_start_riding",
    EntityStopRiding = "minecraft:entity_stop_riding",
    EntityTick = "minecraft:entity_tick",
    PlayerAttackedActor = "minecraft:player_attacked_actor"
}

declare interface IEntityCreatedEventData {
    /**
     * The entity that was just created
     */
    entity: IEntityObject;
}

declare interface IEntityDeathEventData {
    /**
     * The entity that died
     */
    entity: IEntityObject;
}

declare interface IEntityStartRidingEventData {
    /**
     * The rider
     */
    entity: IEntityObject;

    /**
     * The entity being ridden
     */
    ride: IEntityObject;
}

declare interface IEntityStopRidingEventData {
    /**
     * The entity that was riding another entity
     */
    entity: IEntityObject;

    /**
     * If true, the rider stopped riding by their own decision
     */
    exit_from_rider: boolean;

    /**
     * If true, the rider stopped riding because they are now dead

     */
    entity_is_being_destroyed: boolean;

    /**
     * If true, the rider stopped riding because they are now riding a different entity
     */
    switching_rides: boolean;
}

declare interface IEntityTickEventData {
    /**
     * The entity that died
     */
    entity: IEntityObject;
}

declare interface IPlayerAttackedActorEventData {
    /**
     * The player that attacked an entity
     */

    player: IEntityObject;
    /**
     * The entity that was attacked by the player
     */
    attacked_entity: IEntityObject;
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


declare interface IServerSpawnParticleInWorldParameters {
    /**
     * The dimension in which you want to spawn the effect. Can be "overworld", "nether", or "the end"
     */
    dimension: Dimension;
    /**
     * The identifier of the particle effect you want to attach to spawn. This is the same name you gave the effect in its JSON file
     */
    effect: ParticleEffect;
    /**
     * The position in the world where you want to spawn the effect
     */
    position: Vector;
}
