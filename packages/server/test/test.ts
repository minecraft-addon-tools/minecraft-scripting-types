/// <reference path="declarations.d.ts" />

const system = server.registerSystem(0, 0);

system.initialize = function() {
    system.listenForEvent(ReceiveFromMinecraftServer.EntityCreated, onEntityCreated);
}

function onEntityCreated(entity: IEntityObject) {
    const component: IAttackComponent = system.getComponent(entity, MinecraftComponent.Attack)
    component.damage = [0, 1];

    if (system.hasComponent(entity, MinecraftComponent.CollisionBox)) {
        const test: ICollisionBoxComponent = system.getComponent(entity, MinecraftComponent.CollisionBox);
    }

    if (system.hasComponent(entity, MyComponent.Test)) {
        const test2: ITestComponent = system.getComponent(entity, MyComponent.Test);
    }
}
