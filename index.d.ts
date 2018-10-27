declare const server: IServer;

declare const client: IClient;

declare interface IServer {
    registerSystem<TSystem extends ISystemBase>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}

declare interface IClient {
    registerSystem<TSystem extends ISystemBase>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}

declare interface ISystem<TSystem> extends ISystemBase {
    initialize?(this: TSystem): void;

    /**
     * This method gets called once every game tick. The server aims to be 200 times per second, while client aims to be 60, 
     * but neither one is guaranteed and can vary with performance. This is a good place to get, check, and react to component changes.
     */
    update?(this: TSystem): void;
}

declare interface IVanillaSystem extends ISystem<ISystemBase> {

}

declare interface ISystemBase {
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
     * 
     * @param spacialComponent Views are a way for you to filter for entities based on their components. Spatial views have an additional 
     * filtering system based on an area. Once you have registered a view, you can request all the entities that are captured by it. 
     * Views will only ever return entities that are currently active in the level. If your view extends into chunks that are not currently 
     * loaded, entities there will not be included in the view.
     * @param x_attribute This is the X axis value that will be used for the bounding box
     * @param y_attribute This is the Y axis value that will be used for the bounding box
     * @param z_attribute This is the Z axis value that will be used for the bounding box
     */
    registerSpacialView(spacialComponent: IPositionComponent | any, x_attribute: number, y_attribute: number, z_attribute: number): ISpacialView;

    /**
     * By default no filters are added. This will allow views to capture all entities
     * @param ComponentName This is the identifier of the component that will be added to the filter list. Only entities that have that component will be listed in the view
     */
    addFilterToView(ComponentName: string): void;

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

    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Attack): IAttackComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.CollisionBox): ICollisionBoxComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.DamageSensor): IDamageSensorComponent[] | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Equipment): IEquipmentComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Equippable): IEquippableComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Explode): IExplodeComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Healable): IHealableComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Health): IHealthComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Interact): IInteractComponent[] | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Inventory): IInventoryComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.LookAt): ILookAtComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Nameable): INameableComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Position): IPositionComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Rotation): IRotationComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Shooter): IShooterComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.SpawnEntity): ISpawnEntityComponent | null;
    createComponent(entity: IEntityObject, componentName: MinecraftComponent.Teleport): ITeleportComponent | null;

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

    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Attack): IAttackComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.CollisionBox): ICollisionBoxComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.DamageSensor): IDamageSensorComponent[] | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Equipment): IEquipmentComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Equippable): IEquippableComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Explode): IExplodeComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Healable): IHealableComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Health): IHealthComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Interact): IInteractComponent[] | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Inventory): IInventoryComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.LookAt): ILookAtComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Nameable): INameableComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Position): IPositionComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Rotation): IRotationComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Shooter): IShooterComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.SpawnEntity): ISpawnEntityComponent | null;
    getComponent(entity: IEntityObject, componentName: MinecraftComponent.Teleport): ITeleportComponent | null;

    /**
     * Looks for the specified component in the entity. If it exists, retrieves the data from the component and returns it.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     * @param componentIdentifier The name of the component to retrieve from the entity. This is either the name of a built-in component (check the Script Components section) or a custom component created with a call to registerComponent()
     * @returns An object containing the data of the component as described in the component itself, or null if the entity did not have the component or something went wrong when getting the component
     */
    getComponent<TComponent>(entity: IEntityObject, componentIdentifier: string): TComponent | null;
}

declare interface IView { }
declare interface ISpacialView { }

declare interface IEntityObject {
    id: string;
    __identifier__: string;
    __type__: string;
}

declare enum BroadcastableEvent {
    ExecuteCommand = "minecraft:execute_command"
}

declare enum EntityType {
    Entity = "entity",
    ItemEntity = "item_entity"
}
    
declare enum MinecraftClientReceiveEvent {
    ClientEnteredWorld = "minecraft:client_entered_world"
}

declare enum MinecraftClientSendEvent {
    
}


declare enum MinecraftComponent {
    /**
     * This component controls the Attack Damage attribute from the entity. It allows you to change the current minimum and maximum values. Once the changes are applied, the current attack of the entity will be reset to the minimum specified. With the minimum and maximum changed to the values specified. Any buffs or debuffs will be left intact.
     */
    Attack = "minecraft:attack",
    /**
     * Controls the collision box of the entity. When changes to the component are applied the entity's collision box is immediately updated to reflect the new dimensions. WARNING: If the change of the collision box dimensions would cause the entity to be inside a block, the entity might become stuck there and start suffocating.
     */
    CollisionBox = "minecraft:collision_box",
    /**
     * Defines an array of damages and how the entity reacts to them - including whether the entity ignores that damage or not. Currently Minecraft triggers can't be properly serialized so any existing triggers will be completely replaced when applyComponentChanges().
     */
    DamageSensor = "minecraft:damage_sensor",
    /**
     * Defines the loot table the entity uses to defines its equipment. Once the changes are applied, the equipment is re-rolled and a new set of equipment is chosen for the entity.
     */
    Equipment = "minecraft:equipment",
    /**
     * Defines how many and what items the entity can be equipped with.
     */
    Equippable = "minecraft:equippable",
    /**
     * Controls the entity's explosion, timer until the explosion, and whether the timer is counting down or not.
     */
    Explode = "minecraft:explode",
    /**
     * Defines how the entity can be healed by the player. This doesn't control how much health the entity can have; you must use the Health component for that instead.
     */
    Healable = "minecraft:healable",
    /**
     * Defines the current and maximum possible health of the entity. Upon applying the component back to the entity the health will change. If it reaches 0 or below the entity will die.
     */
    Health = "minecraft:health",
    /**
     * Defines the ways the player can interact with the entity to which this component is applied.
     */
    Interact = "minecraft:interact",
    /**
     * Defines the entity's inventory (size, restrictions, etc.). Currently this does not allow changing the entity's inventory contents.
     */
    Inventory = "minecraft:inventory",
    /**
     * Makes the entity look at another entity. Once applied, if an entity of the specified type is nearby and can be targeted the entity will turn towards it.
     */
    LookAt = "minecraft:look_at",
    /**
     * Nameable component describes an entity's ability to be named using a nametag and whether the name shows up or not once applied. Additionally, scripting allows setting the name of the entity directly with the property 'name'.
     */
    Nameable = "minecraft:nameable",
    /**
     * This component allows you to control an entity's current position in the world. Once applied the entity will be teleported to the new position specified.
     */
    Position = "minecraft:position",
    /**
     * This component allows you to control an entity's current rotation in the world as well as the entity's head rotation. Once applied, the entity will be rotated as specified.
     */
    Rotation = "minecraft:rotation",
    /**
     * Defines the entity's ranged attacks. This doesn't allow the entity to use a ranged attack: it only defines what kind of projectile it shoots.
     */
    Shooter = "minecraft:shooter",
    /**
     * Controls the entity's ability to spawn an entity or an item. This is similar to the chicken's ability to lay eggs after a set amount of time.
     */
    SpawnEntity = "minecraft:spawn_entity",
    /**
     * This controls the entity's ability to teleport itself (similar to the Enderman). If you wish to teleport the entity once use the Position component instead.
     */
    Teleport = "minecraft:teleport"
    }
    
    /**
     * This component controls the Attack Damage attribute from the entity. It allows you to change the current minimum and maximum values. Once the changes are applied, the current attack of the entity will be reset to the minimum specified. With the minimum and maximum changed to the values specified. Any buffs or debuffs will be left intact.
     */
    declare interface IAttackComponent {
    /**
     * Range of the random amount of damage the melee attack deals. A negative value can heal the entity instead of hurting it
     */
    damage: [number, number];
    /**
     * Name of the status ailment to apply to an entity attacked by this entity's melee attack
     */
    effect_name: string;
    /**
     * Duration in seconds of the status ailment applied to the damaged entity
     */
    effect_duration: number;
    }
    
    /**
     * Controls the collision box of the entity. When changes to the component are applied the entity's collision box is immediately updated to reflect the new dimensions. WARNING: If the change of the collision box dimensions would cause the entity to be inside a block, the entity might become stuck there and start suffocating.
     */
    declare interface ICollisionBoxComponent {
    /**
     * Width and Depth of the collision box in blocks. A negative value will be assumed to be 0
     */
    width: number;
    /**
     * Height of the collision box in blocks. A negative value will be assumed to be 0
     */
    height: number;
    }
    
    /**
     * Defines an array of damages and how the entity reacts to them - including whether the entity ignores that damage or not. Currently Minecraft triggers can't be properly serialized so any existing triggers will be completely replaced when applyComponentChanges().
     */
    declare interface IDamageSensorComponent {
    /**
     * List of triggers with the events to call when taking this specific kind of damage, allows specifying filters for entity definitions and events
     */
    on_damage: any[];
    /**
     * If true, the damage dealt to the entity will take away health from it, set to false to make the entity ignore that damage
     */
    deals_damage: boolean;
    /**
     * Type of damage that triggers this set of events
     */
    cause: string;
    }
    
    /**
     * Defines the loot table the entity uses to defines its equipment. Once the changes are applied, the equipment is re-rolled and a new set of equipment is chosen for the entity.
     */
    declare interface IEquipmentComponent {
    /**
     * The file path to the equipment table, relative to the behavior pack's root
     */
    table: string;
    /**
     * A list of slots with the chance to drop an equipped item from that slot
     */
    slot_drop_chance: any[];
    }
    
    /**
     * Defines how many and what items the entity can be equipped with.
     */
    declare interface IEquippableComponent {
    /**
     * List of slots and the item that can be equipped
     *  Name Type Default Value Description 
     * 
     * slot
     * Integer
     * 0
     * The slot number of this slot
     * 
     * 
     * accepted_items
     * List
     * 
     * The list of item identifiers that can go in this slot
     * 
     * 
     * item
     * String
     * 
     * Name of the item that can be equipped for this slot
     * 
     * 
     * interact_text
     * String
     * 
     * Text to be displayed when the entity can be equipped with this item when playing with Touch-screen controls
     * 
     * 
     * on_equip
     * String
     * 
     * Event to trigger when this entity is equipped with this item
     * 
     * 
     * on_unequip
     * String
     * 
     * Event to trigger when this item is removed from this entity
     * 
     * 
     * 
     */
    slots: any[];
    }
    
    /**
     * Controls the entity's explosion, timer until the explosion, and whether the timer is counting down or not.
     */
    declare interface IExplodeComponent {
    /**
     * The range for the random amount of time the fuse will be lit before exploding, a negative value means the explosion will be immediate
     */
    fuseLength: [number, number];
    /**
     * The radius of the explosion in blocks and the amount of damage the explosion deals
     */
    power: number;
    /**
     * A blocks explosion resistance will be capped at this value when an explosion occurs
     */
    maxResistance: number;
    /**
     * If true, the fuse is already lit when this component is added to the entity
     */
    fuseLit: boolean;
    /**
     * If true, blocks in the explosion radius will be set on fire
     */
    causesFire: boolean;
    /**
     * If true, the explosion will destroy blocks in the explosion radius
     */
    breaks_blocks: boolean;
    /**
     * If true, whether the explosion causes fire is affected by the mob griefing game rule
     */
    fireAffectedByGriefing: boolean;
    /**
     * If true, whether the explosion breaks blocks is affected by the mob griefing game rule
     */
    destroyAffectedByGriefing: boolean;
    }
    
    /**
     * Defines how the entity can be healed by the player. This doesn't control how much health the entity can have; you must use the Health component for that instead.
     */
    declare interface IHealableComponent {
    /**
     * Determines if item can be used regardless of entity being at full health
     */
    force_use: boolean;
    /**
     * The filter group that defines the conditions for this trigger
     */
    filters: any;
    /**
     * The array of items that can be used to heal this entity
     *  Name Type Default Value Description 
     * 
     * item
     * String
     * 
     * Item identifier that can be used to heal this entity
     * 
     * 
     * heal_amount
     * Integer
     * 1
     * The amount of health this entity gains when fed this item
     * 
     * 
     * filters
     * Minecraft Filter
     * 
     * The filter group that defines the conditions for using this item to heal the entity
     * 
     * 
     * 
     */
    items: any[];
    }
    
    /**
     * Defines the current and maximum possible health of the entity. Upon applying the component back to the entity the health will change. If it reaches 0 or below the entity will die.
     */
    declare interface IHealthComponent {
    /**
     * Current health of the entity
     */
    health: number;
    /**
     * The maximum health the entity can heal
     */
    maxHealth: number;
    }
    
    /**
     * Defines the ways the player can interact with the entity to which this component is applied.
     */
    declare interface IInteractComponent {
    /**
     * An array of entity identifiers to spawn when the interaction occurs
     */
    spawn_entities: any[];
    /**
     * An event identifier to fire when the interaction occurs
     */
    on_interact: string;
    /**
     * Particle effect that will be triggered at the start of the interaction
     *  Name Type Default Value Description 
     * 
     * particle_type
     * String
     * 
     * The type of particle that will be spawned
     * 
     * 
     * particle_y_offset
     * Decimal
     * 0.0
     * Will offset the particle this amount in the y direction
     * 
     * 
     * particle_offset_towards_interactor
     * Boolean
     * false
     * Whether or not the particle will appear closer to who performed the interaction
     * 
     * 
     * 
     */
    particle_on_start: any;
    /**
     * Time in seconds before this entity can be interacted with again
     */
    cooldown: number;
    /**
     * If true, the player will do the 'swing' animation when interacting with this entity
     */
    swing: boolean;
    /**
     * If true, the interaction will use an item
     */
    use_item: boolean;
    /**
     * The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability
     */
    hurt_item: number;
    /**
     * Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls
     */
    interact_text: string;
    /**
     * Loot table with items to add to the player's inventory upon successful interaction
     *  Name Type Default Value Description 
     * 
     * table
     * String
     * 
     * File path, relative to the behavior pack's path, to the loot table file
     * 
     * 
     * 
     */
    add_items: any;
    /**
     * Loot table with items to drop on the ground upon successful interaction
     *  Name Type Default Value Description 
     * 
     * table
     * String
     * 
     * File path, relative to the behavior pack's path, to the loot table file
     * 
     * 
     * 
     */
    spawn_items: any;
    /**
     * The item used will transform to this item upon successful interaction. Format: itemName:auxValue
     */
    transform_to_item: string;
    /**
     * An array of sound identifiers to play when the interaction occurs
     */
    play_sounds: any[];
    }
    
    /**
     * Defines the entity's inventory (size, restrictions, etc.). Currently this does not allow changing the entity's inventory contents.
     */
    declare interface IInventoryComponent {
    /**
     * Type of container this entity has. Can be horse, minecart_chest, minecart_hopper, inventory, container or hopper
     */
    container_type: string;
    /**
     * Number of slots the container has
     */
    inventory_size: number;
    /**
     * If true, the contents of this inventory can be removed by a hopper
     */
    can_be_siphoned_from: boolean;
    /**
     * If true, only the entity can access the inventory
     */
    private: boolean;
    /**
     * If true, the entity's inventory can only be accessed by its owner or itself
     */
    restrict_to_owner: boolean;
    /**
     * Number of slots that this entity can gain per extra strength
     */
    additional_slots_per_strength: number;
    }
    
    /**
     * Makes the entity look at another entity. Once applied, if an entity of the specified type is nearby and can be targeted the entity will turn towards it.
     */
    declare interface ILookAtComponent {
    /**
     * Defines the entities that can trigger this component
     */
    filters: any;
    /**
     * The range for the random amount of time during which the entity is 'cooling down' and won't get angered or look for a target
     */
    look_cooldown: [number, number];
    /**
     * The event identifier to run when the entities specified in filters look at this entity
     */
    look_event: string;
    /**
     * If true, invulnerable entities (e.g. Players in creative mode) are considered valid targets
     */
    mAllowInvulnerable: boolean;
    /**
     * Maximum distance this entity will look for another entity looking at it
     */
    searchRadius: number;
    /**
     * If true, this entity will set the attack target as the entity that looked at it
     */
    setTarget: boolean;
    }
    
    /**
     * Nameable component describes an entity's ability to be named using a nametag and whether the name shows up or not once applied. Additionally, scripting allows setting the name of the entity directly with the property 'name'.
     */
    declare interface INameableComponent {
    /**
     * Describes the special names for this entity and the events to call when the entity acquires those names
     *  Name Type Default Value Description 
     * 
     * on_named
     * String
     * 
     * Event to be called when this entity acquires the name specified in 'name_filter'
     * 
     * 
     * name_filter
     * List
     * 
     * List of special names that will cause the events defined in 'on_named' to fire
     * 
     * 
     * 
     */
    name_actions: any;
    /**
     * Trigger to run when the entity gets named
     */
    default_trigger: string;
    /**
     * If true, the name will always be shown
     */
    alwaysShow: boolean;
    /**
     * If true, this entity can be renamed with name tags
     */
    allowNameTagRenaming: boolean;
    /**
     * The current name of the entity, empty if the entity hasn't been named yet, making this non-empty will apply the name to the entity
     */
    name: string;
    }
    
    /**
     * This component allows you to control an entity's current position in the world. Once applied the entity will be teleported to the new position specified.
     */
    declare interface IPositionComponent {
    /**
     * Position along the X-Axis (east-west) of the entity
     */
    x: number;
    /**
     * Position along the Y-Axis (height) of the entity
     */
    y: number;
    /**
     * Position along the Z-Axis (north-south) of the entity
     */
    z: number;
    }
    
    /**
     * This component allows you to control an entity's current rotation in the world as well as the entity's head rotation. Once applied, the entity will be rotated as specified.
     */
    declare interface IRotationComponent {
    /**
     * Controls the head rotation looking up and down
     */
    x: number;
    /**
     * Controls the body rotation parallel to the floor
     */
    y: number;
    }
    
    /**
     * Defines the entity's ranged attacks. This doesn't allow the entity to use a ranged attack: it only defines what kind of projectile it shoots.
     */
    declare interface IShooterComponent {
    /**
     * Entity identifier to use as projectile for the ranged attack. The entity must have the projectile component to be able to be shot as a projectile
     */
    def: string;
    /**
     * ID of the Potion effect to be applied on hit
     */
    auxVal: number;
    }
    
    /**
     * Controls the entity's ability to spawn an entity or an item. This is similar to the chicken's ability to lay eggs after a set amount of time.
     */
    declare interface ISpawnEntityComponent {
    /**
     * Minimum amount of time to randomly wait in seconds before another entity is spawned
     */
    min_wait_time: number;
    /**
     * Maximum amount of time to randomly wait in seconds before another entity is spawned
     */
    max_wait_time: number;
    /**
     * Name of the sound effect to play when the entity is spawned
     */
    spawn_sound: string;
    /**
     * Item identifier of the item to spawn
     */
    spawn_item: string;
    /**
     * Identifier of the entity to spawn, leave empty to spawn the item defined above instead
     */
    spawn_entity: string;
    /**
     * Method to use to spawn the entity
     */
    spawn_method: string;
    /**
     * Event to call when the entity is spawned
     */
    spawn_event: string;
    }
    
    /**
     * This controls the entity's ability to teleport itself (similar to the Enderman). If you wish to teleport the entity once use the Position component instead.
     */
    declare interface ITeleportComponent {
    /**
     * Modifies the chance that the entity will teleport if the entity is in darkness
     */
    darkTeleportChance: number;
    /**
     * Modifies the chance that the entity will teleport if the entity is in daylight
     */
    lightTeleportChance: number;
    /**
     * Maximum amount of time in seconds between random teleports
     */
    maxRandomTeleportTime: number;
    /**
     * Minimum amount of time in seconds between random teleports
     */
    minRandomTeleportTime: number;
    /**
     * Entity will teleport to a random position within the area defined by this cube
     */
    randomTeleportCube: [number, number, number];
    /**
     * If true, the entity will teleport randomly
     */
    randomTeleports: boolean;
    /**
     * Maximum distance the entity will teleport when chasing a target
     */
    targetDistance: number;
    /**
     * The chance that the entity will teleport between 0.0 and 1.0. 1.0 means 100%
     */
    target_teleport_chance: number;
    }