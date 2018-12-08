declare const server: IServer;

declare interface IServer {
    registerSystem<TSystem extends IServerSystem<TSystem> = IVanillaServerSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}