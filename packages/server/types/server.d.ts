declare const server: IServer;

declare interface IServer {
    registerSystem<TSystem extends IServerSystem<TSystem> = IVanillaServerSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}

declare interface IExecuteCommandCallback {
    command: string;
    data: {
        message: string;
        statusCode: number;
    }
}