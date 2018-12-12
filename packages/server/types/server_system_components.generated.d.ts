/// <reference path="./server_component_names.generated.d.ts" />
/// <reference path="./server_component.generated.d.ts" />

declare interface ComponentTypeMap {
    [MinecraftComponent.Attack]: IAttackComponent;
    [MinecraftComponent.CollisionBox]: ICollisionBoxComponent;
    [MinecraftComponent.DamageSensor]: IDamageSensorComponent[];
    [MinecraftComponent.Equipment]: IEquipmentComponent;
    [MinecraftComponent.Equippable]: IEquippableComponent;
    [MinecraftComponent.Explode]: IExplodeComponent;
    [MinecraftComponent.Healable]: IHealableComponent;
    [MinecraftComponent.Health]: IHealthComponent;
    [MinecraftComponent.Interact]: IInteractComponent[];
    [MinecraftComponent.Inventory]: IInventoryComponent;
    [MinecraftComponent.LookAt]: ILookAtComponent;
    [MinecraftComponent.Nameable]: INameableComponent;
    [MinecraftComponent.Position]: IPositionComponent;
    [MinecraftComponent.Rotation]: IRotationComponent;
    [MinecraftComponent.Shooter]: IShooterComponent;
    [MinecraftComponent.SpawnEntity]: ISpawnEntityComponent;
    [MinecraftComponent.Teleport]: ITeleportComponent;
}