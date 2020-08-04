declare const CLIENT: IClient;

declare interface IClient {
    registerSystem<TSystem extends IClientSystem<TSystem> = IVanillaClientSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}
