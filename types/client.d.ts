declare const client: IClient;

declare interface IClient {
    registerSystem<TSystem extends ISystemBase>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}
