/**
 * This interface is used to include the generated methods on the IClientSystem in a way that the generic variants do not
 * take precidence over the specific, generated versions.
 */

declare interface IVanillaClientSystemBase {
    /**
     * Allows you to register a query that will only show entities that have the given component and define which fields of that component will be used as a filter when getting the entities from the query.
     * 
     * This is the identifier of the component that will be used to filter entities when
     * @param componentField1 This is the name of the first field of the component that we want to filter entities by. By default this is set to x. If the component you used doesn't have the field you defined here, the field will be ignored
     * @param componentField2 This is the name of the second field of the component that we want to filter entities by. By default this is set to y. If the component you used doesn't have the field you defined here, the field will be ignored
     * @param componentField3 This is the name of the third field of the component that we want to filter entities by. By default this is set to z. If the component you used doesn't have the field you defined here, the field will be ignored
     */
    registerQuery(component: MinecraftComponent | string, componentField1?: string, componentField2?: string, componentField3?: string): IQuery;

    /**
     * Allows you to register a query. A query will contain all entities that meet the filter requirement.
     * No filters are added by default when you register a query so it will capture all entities.
     */
    //Ideally this would be in system.d.ts, but it seems to conflict with the parameterized version
    registerQuery(): IQuery | null;
}

declare interface IClientSystem<TSystem> extends ISystem<TSystem>, IVanillaClientSystemBase {

}

/**
 * a utility interface that defines a system that is not being actively extended
 */
declare interface IVanillaClientSystem extends IClientSystem<IVanillaClientSystem> {

}