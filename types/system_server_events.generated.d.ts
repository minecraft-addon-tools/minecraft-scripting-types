declare interface IVanillaServerSystemBase {
    ///////////////////////////
    // broadcastEvent overloads

    /**
     This event is used to display a chat message to the specific player that is running the client script. The event data is the message to be displayed in plain text. Special formatting is supported the same way it would be if a player was sending the message.
     * @param chatText The message to display. Normal Minecraft formatting codes work.
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.DisplayChat, chatText: string): boolean | null;
    /**
     * This event is used to run a slash command from the specific player running the client script. The script runs it as that player. The event data contains the slash command in plain text. The slash command will be run immediately after the event is triggered.
     * @param command The command to execute, it should start with "/"
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.ExecuteCommand, command: string): boolean | null;
    /**
     * This event is used to show a UI screen to the specific player running the client script. This event will add the UI screen to the top of the UI screen stack. The event data contains the file path to the screen's HTML file as a string. The screen will be shown immediately after the event is triggered. Only screens defined in a HTML file can be shown using this event.
     * @param uiName The identifier of the UI to open.
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.LoadUI, uiName: string): boolean | null;
    /**
     * This event is used to send UI events to the UI Engine for the specific player running the script. After the event is triggered, the UI event will be sent immediately.
     * Custom UI is based on HTML 5. Review the scripting demo for an example of a custom UI file.
     * @param eventData The event data to send to the UI. It's reasonable to use JSON.stringify for the data parameter.
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.SendUIEvent, uiEvent: IUIEventParameters): boolean | null
    /**
     * This event is used to create a particle effect that will follow an entity around. This particle effect is only visible to the specific player that is running the client script where you fired the event. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. MoLang variables defined in the JSON of the effect can then be used to control that effect by changing them in the entity to which it is attached.
     * @param particleParameters the details of the particle to spawn
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.SpawnParticleAttachedEntity, particleParameters: ISpawnParticleAttachedEntityParameters): boolean | null
    /**
     * This event is used to create a static particle effect in the world. This particle effect is only visible to the specific player that is running the client script where you fired the event. Any effect defined in a JSON file (both in your resource pack and in Minecraft) can be used here. Once the effect is spawned you won't be able to control it further. Unlike the server version of the event, the client version will spawn the particle in the dimension the player is currently in.
     * @param particleParameters the details of the particle to spawn 
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.SpawnParticleInWorld, particleParameters: ISpawnParticleInWorldParameters): boolean | null
    /**
     * This event is used to remove a UI screen from the stack of the specific player running the client script. The event data contains the name of the screen to remove as a string. After the event is triggered the screen will be scheduled to be removed from the stack the next time the UI Engine can do so. Only screens defined in a HTML file can be removed using this event.
     * @param uiName the name of the UI to close
     */
    broadcastEvent(eventIdentifier: BroadcastableServerEvent.UnloadUI, uiName: string): boolean | null

    ///////////////////////////
    // listenForEvent overloads

    /**
     * This event is triggered whenever an entity is added to the world.
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.EntityCreated, eventData: (eventData: IEntityCreatedEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity dies. This won't be triggered when an entity is removed (such as when using destroyEntity)
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.EntityDeath, eventData: (eventData: IEntityDeathEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity becomes a rider on another entity.
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.EntityStartRiding, eventData: (eventData: IEntityStartRidingEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity stops riding another entity.
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.EntityStopRiding, eventData: (eventData: IEntityStopRidingEventData) => void): boolean | null;
    /**
     * This event is triggered whenever an entity is ticked. This event will not fire when a player is ticked.
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.EntityTick, eventData: (eventData: IEntityTickEventData) => void): boolean | null;
    /**
     * This event is triggered whenever a player attacks an entity.
     */
    listenForEvent(eventIdentifier: MinecraftServerEvent.PlayerAttackedActor, eventData: (eventData: IPlayerAttackedActorEventData) => void): boolean | null;

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
    listenForEvent<TEventDataType = any>(eventIdentifier: string, eventData: (eventData: TEventDataType) => void ): boolean | null;
}