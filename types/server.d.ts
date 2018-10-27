declare const server: IServer;

declare interface IServer {
    registerSystem<TSystem extends ISystemBase>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}
