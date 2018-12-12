/**
 * This interface is used to include the generated methods on the IServerSystem in a way that the generic variants do not
 * take precidence over the specific, generated versions.
 */
declare interface IVanillaServerSystemBase {
    
}

declare interface IServerSystem<TSystem> extends ISystem<TSystem>, IVanillaServerSystemBase {
    /**
     * Allows you to register a query. A query will contain all entities that meet the filter requirement.
     * No filters are added by default when you register a query so it will capture all entities.
     */
    //Ideally this would be in system.d.ts, but it seems to conflict with the parameterized version
    registerQuery(): IQuery | null;
}

/**
 * a utility interface that defines a system that is not being actively extended
 */
declare interface IVanillaServerSystem extends IServerSystem<IVanillaServerSystem> {

}