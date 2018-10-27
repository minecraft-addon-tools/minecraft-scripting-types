declare interface ISystemBase {
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
     * Creates a component of the specified name and adds it to the entity. This should only be used with custom components which need 
     * to be registered first. If the entity already has the component, this will retrieve the component already there instead.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     * @param componentName The name of the component to add to the entity. This is either the name of a built-in component (check the Script Components section) or a custom component created with a call to registerComponent()
     * @returns An object with all the fields as defined in the component
     */
    createComponent<TComponent>(entity: IEntityObject, componentName: string): TComponent | null;

    /**
     * Looks for the specified component in the entity. If it exists, retrieves the data from the component and returns it.
     * @param entity The EntityObject that was retrieved from a call to createEntity() or retrieved from an event
     * @param componentIdentifier The name of the component to retrieve from the entity. This is either the name of a built-in component (check the Script Components section) or a custom component created with a call to registerComponent()
     * @returns An object containing the data of the component as described in the component itself, or null if the entity did not have the component or something went wrong when getting the component
     */
    getComponent<TComponent>(entity: IEntityObject, componentIdentifier: MinecraftComponent | string): TComponent | null;
}