/// <reference path="./entity.d.ts" />
/// <reference path="./component_names.generated.d.ts" />
/// <reference path="./component.generated.d.ts" />
declare interface ISystemBase {
    $$createComponent$$

    $$getComponent$$

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