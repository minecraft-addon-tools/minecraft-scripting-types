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

declare interface ISpawnParticleInWorldParameters {
    /**
     * The identifier of the particle effect you want to attach to spawn. This is the same name you gave the effect in its JSON file
     */
    effect: ParticleEffect;
    /**
     * The position in the world where you want to spawn the effect
     */
    offset: Vector;
}

declare interface IHitResultChangedEvent {
    /**
     * The enity that was hit or null if it fired when moving off of an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or null if it fired when moving off an entity
     */
    position: Vector
}

declare interface IHitResultContinuousEvent {
    /**
     * The enity that was hit or null if it not pointing at an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or block that was hit
     */
    position: Vector
}

declare interface IPickHitResultChangedEvent {
    /**
     * The enity that was hit or null if it fired when moving off of an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or null if it fired when moving off an entity
     */
    position: Vector | null
}

declare interface IPickHitResultContinuousEvent {
    /**
     * The enity that was hit or null if it not pointing at an entity
     */
    entity: EntityId,
    /**
     * The position of the enity that was hit or block that was hit
     */
    position: Vector
}