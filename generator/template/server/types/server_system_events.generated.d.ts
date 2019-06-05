/// <reference path="./server_events.generated.d.ts" />

declare interface IVanillaServerSystemBase {
    ///////////////////////////
    // createEventData overloads

    $$createEventDataServer$$

    ///////////////////////////
    // broadcastEvent overloads

    $$broadcastEventServer$$

    ///////////////////////////
    // listenForEvent overloads

    $$listenForEventServer$$

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Generic method for other custom events
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Registers the Event to the script engine. This allows you to create Event Data by calling createEventData and have it initialized with the correct default data and fields. Only custom events need to be registered.
     * 
     * @param eventIdentifier This is the identifier of the custom event we are registering. The namespace is required and can't be set to minecraft.
     * @param eventData The JavaScript object with the correct fields and default values for the event
     */
    registerEventData<TEventDataType = any>(eventIdentifier: string, eventData: TEventDataType): true | null;

    /**
     * Creates an object with all the required fields and default data for the specified event. If the event is a custom event, it needs to have been previously registered.
     * 
     * @param eventIdentifier This is the identifier of the custom event we are registering. The namespace is required and can't be set to minecraft. 
     */
    createEventData<TEventDataType = any>(eventIdentifier: string): IEventData<TEventDataType> | null;

    /**
     * 
     * @param eventIdentifier Allows you to trigger an event with the desired data from script. 
     * Anything that signed up to listen for the event will be notified and the given data delivered to them.
     * @param eventData The data for the event. You can create a new JavaScript Object with the parameters you want to pass in to the listener and the engine will take care of delivering the data to them
     */
    broadcastEvent<TEventDataType = any>(eventIdentifier: string, eventData: IEventData<TEventDataType>): boolean | null;

    /**
     * Allows you to register a JavaScript object that gets called whenever the specified event is broadcast. The event can either be a built-in event or an event specified in script.
     * @param eventIdentifier This is the name of the event to which we want to react. Can be the identifier of a built-in event or a custom one from script
     * @param eventData The name of the JavaScript object that will get called whenever the event is broadcast
     */
    listenForEvent<TEventDataType = any>(eventIdentifier: string, callback: (eventData: IEventData<TEventDataType>) => void): boolean | null;
}
