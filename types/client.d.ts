declare const client: IClient;

declare interface IVanillaClientSystemBase {
    
}

declare interface IClientSystem<TSystem> extends ISystem<TSystem>, IVanillaClientSystemBase {

}

declare interface IVanillaClientSystem extends IClientSystem<IVanillaClientSystem> {

}

declare interface IClient {
    registerSystem<TSystem extends IClientSystem<TSystem> = IVanillaClientSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}
