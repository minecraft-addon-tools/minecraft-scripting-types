declare const server: IServer;

declare const client: IClient;

declare interface IServer {
    registerSystem<TSystem extends IServerSystem<TSystem>>(majorVersion: number, minorVersion: number) : TSystem
}

declare interface IClient {

}

declare interface IServerSystem<TSystem> {
    initialize?(this: TSystem): void;

    /**
     * 
     * @param eventIdentifier Allows you to trigger an event with the desired data from script. 
     * Anything that signed up to listen for the event will be notified and the given data delivered to them.
     * @param eventData The data for the event. You can create a new JavaScript Object with the parameters you want to pass in to the listener and the engine will take care of delivering the data to them
     */
    broadcastEvent(eventIdentifier: BroadcastableEvent | string, eventData: any): boolean | null;

    /**
     * Allows you to register a JavaScript object that gets called whenever the specified event is broadcast. The event can either be a built-in event or an event specified in script.
     * @param eventIdentifier This is the name of the event to which we want to react. Can be the identifier of a built-in event or a custom one from script
     * @param eventData The name of the JavaScript object that will get called whenever the event is broadcast
     */
    listenForEvent(eventIdentifier: string, eventData: (eventData: any) => void ): boolean | null;

    /**
     * Allows you to register a view. A view will contain all entities that meet the filter requirement.
     * No filters are added by default when you register a view so it will capture all entities.
     */
    registerView(): IView;

    /**
     * This method gets called once every game tick. The server aims to be 200 times per second, while client aims to be 60, 
     * but neither one is guaranteed and can vary with performance. This is a good place to get, check, and react to component changes.
     */
    update(this: TSystem): void;

    /**
     * User-Defined components are a special kind of component that can be defined in script and no built-in game system acts on it.
     * The component needs to be registered with the Script Engine by giving it a name and a set of fields in the format name:value. 
     * Once applied, the component behaves like any of the built-in components: you can get it from an entity, modify its values, and 
     * apply the changes.
     * Currently User-Defined components are the only components that can be dynamically added and removed from an entity using scripts. 
     * They don't need to be previously defined in an entity's JSON file. In the current version these components will NOT be saved out or 
     * loaded back in: they only exist while the entity is there and need to be added back when reloading the level.
     * @param componentIdentifier The name of the custom component. It is required to use a namespace so you can uniquely refer to it later without overlapping a name with a built-in component: for example 'myPack:myCustomComponent'
     * @param componentData A JavaScript Object that defines the name of the fields and the data each field holds inside the component.
     */
    registerComponent(componentIdentifier: string, componentData: object): any;

    /**
     * Allows you to fetch the entities captured by a view.
     * @param viewAllEntities This is the view you registered earlier using registerView()
     * @returns An array of IEntityObjects representing the entities found within the view
     */
    getEntitiesFromView(viewAllEntities: IView): IEntityObject[];

    /**
     * Creates an entity and applies the specified template as defined in JSON. This allows you to quickly create an entity from the 
     * applied Behavior Packs as the base for an entity created in scripting. The entity will be spawned into the world with all the 
     * components, component groups, and event triggers that are defined in the JSON file of the identifier specified.
     * @param type Specifies the type of the entity that is being created by the template. Valid inputs are `entity` and `item_entity`
     * @param templateIdentifier This can be any of the entity identifiers from the applied Behavior Packs. For example specifying minecraft:cow here will make the provided entity a cow as defined in JSON
     */
    createEntity(type: EntityType, templateIdentifier: string): IEntityObject | null;

    /**
     * Destroys an entity identified by the EntityObject. If the entity exists in the world this will remove it from the world and 
     * destroy it. This also makes the EntityObject no longer valid - you should only destroy an entity after you are done with it and 
     * no longer need to reference it again. This does NOT kill the entity. There won't be an event for its death: it will be removed.
     * @param entity The IEntityObject that was retrieved from a call to createEntity() or retrieved from an event
     */
    destroyEntity(entity: IEntityObject): boolean | null;

    /**
     * Checks if the given EntityObject corresponds to a valid entity.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     */
    isValidEntity(entity: IEntityObject): boolean | null;

    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Position): IPositionComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Rotation): IRotationComponent | null;
    /**
     * Creates a component of the specified name and adds it to the entity. This should only be used with custom components which need 
     * to be registered first. If the entity already has the component, this will retrieve the component already there instead.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     * @param componentName The name of the component to add to the entity. This is either the name of a built-in component (check the Script Components section) or a custom component created with a call to registerComponent()
     * @returns An object with all the fields as defined in the component
     */
    createComponent<TComponent>(entity: IEntityObject, componentName: string): TComponent | null;
    

    /**
     * Applies the component and any changes made to it in script back to the entity. What this means for each component can be slightly 
     * different: it makes the component reload on the entity with the new data as if it had just been added to the entity.
     * @param component The component object retrieved from the entity that was returned by either createComponent() or getComponent()
     */
    applyComponentChanges(component: any): boolean | null;

    getComponent(entity: IEntityObject, componentIdentifier: MinecraftComponent.Position): IPositionComponent | null;
    getComponent(entity: IEntityObject, componentIdentifier: MinecraftComponent.Rotation): IRotationComponent | null;
    /**
     * Looks for the specified component in the entity. If it exists, retrieves the data from the component and returns it.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     * @param componentIdentifier The name of the component to retrieve from the entity. This is either the name of a built-in component (check the Script Components section) or a custom component created with a call to registerComponent()
     * @returns An object containing the data of the component as described in the component itself, or null if the entity did not have the component or something went wrong when getting the component
     */
    getComponent<TComponent>(entity: IEntityObject, componentIdentifier: MinecraftComponent | string): TComponent | null;
    
}

declare interface IView {

}

declare interface IEntityObject {
    id: string;
    __identifier__: string;

}

declare enum BroadcastableEvent {
    ExecuteCommand = "minecraft:execute_command"
}

declare enum EntityType {
    Entity = "entity",
    ItemEntity = "item_entity"
}

declare enum MinecraftComponent {
    Position = "minecraft:position",
    Rotation = "minecraft:rotation"
}

declare interface IPositionComponent {
    x: number;
    y: number;
    z: number;
}

declare interface IRotationComponent {
    x: number;
    y: number;
}