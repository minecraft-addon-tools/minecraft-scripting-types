declare const server: IServer;

declare interface IServer {
    registerSystem<TSystem extends ISystemBase = IVanillaServerSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}
