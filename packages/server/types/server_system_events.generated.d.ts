/// <reference path="./server_events.generated.d.ts" />

declare interface IVanillaServerSystemBase {
    ///////////////////////////
    // broadcastEvent overloads

    /**
     * This event is used to send a chat message from the server to the players. The event data is the message being sent as a string. Special formatting is supported the same way it would be if a player was sending the message.
     * @param chatText The message to display. Normal Minecraft formatting codes work.
     */
    broadcastEvent(eventIdentifier: SendToMinecraftServer.DisplayChat, chatText: string): boolean | null;
    /**
     * This event is used to execute a slash command on the server with the World Owner permission level. The event data contains the slash command as a string. The slash command will be processed and will run after the event is sent.
     * @param command The command to execute, it should start with "/"
     */
    broadcastEvent(eventIdentifier: SendToMinecraftServer.ExecuteCommand, command: string): boolean | null;
    /**
     * This event is used to create a particle effect that will follow an entity around. This particle effect is visible to all players. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. MoLang variables defined in the JSON of the effect can then be used to control that effect by changing them in the entity to which it is attached.
     * @param particleParameters the details of the particle to spawn
     */
    broadcastEvent(eventIdentifier: SendToMinecraftServer.SpawnParticleAttachedEntity, particleParameters: ISpawnParticleAttachedEntityParameters): boolean | null
    /**
     * This event is used to create a static particle effect in the world. This particle effect is visible to all players. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. Once the effect is spawned you won't be able to control it further.
     * @param particleParameters the details of the particle to spawn 
     */
    broadcastEvent(eventIdentifier: SendToMinecraftServer.SpawnParticleInWorld, particleParameters: IServerSpawnParticleInWorldParameters): boolean | null

    ///////////////////////////
    // listenForEvent overloads

    /**
     * This event is triggered whenever an entity is added to the world.
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.EntityCreated, callback: (eventData: IEntityCreatedEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity dies. This won't be triggered when an entity is removed (such as when using destroyEntity)
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.EntityDeath, callback: (eventData: IEntityDeathEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity becomes a rider on another entity.
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.EntityStartRiding, callback: (eventData: IEntityStartRidingEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity stops riding another entity.
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.EntityStopRiding, callback: (eventData: IEntityStopRidingEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity is ticked. This event will not fire when a player is ticked.
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.EntityTick, callback: (eventData: IEntityTickEventData) => void): boolean | null;
    /**
     * This event is triggered whenever a player attacks an entity.
     */
    listenForEvent(eventIdentifier: ReceiveFromMinecraftServer.PlayerAttackedActor, callback: (eventData: IPlayerAttackedActorEventData) => void): boolean | null;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Generic method for other custom events
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 
     * @param eventIdentifier Allows you to trigger an event with the desired data from script. 
     * Anything that signed up to listen for the event will be notified and the given data delivered to them.
     * @param eventData The data for the event. You can create a new JavaScript Object with the parameters you want to pass in to the listener and the engine will take care of delivering the data to them
     */
    broadcastEvent(eventIdentifier: string, eventData: any): boolean | null;

    /**
     * Allows you to register a JavaScript object that gets called whenever the specified event is broadcast. The event can either be a built-in event or an event specified in script.
     * @param eventIdentifier This is the name of the event to which we want to react. Can be the identifier of a built-in event or a custom one from script
     * @param eventData The name of the JavaScript object that will get called whenever the event is broadcast
     */
    listenForEvent<TEventDataType = any>(eventIdentifier: string, callback: (eventData: TEventDataType) => void ): boolean | null;
}