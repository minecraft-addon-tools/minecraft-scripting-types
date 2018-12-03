/// <reference path="../system.d.ts" />

declare const server: IServer;

declare interface IVanillaServerSystemBase {
    
}

declare interface IServerSystem<TSystem> extends ISystem<TSystem>, IVanillaServerSystemBase {

}

declare interface IVanillaServerSystem extends IServerSystem<IVanillaServerSystem> {

}

declare interface IServer {
    registerSystem<TSystem extends IServerSystem<TSystem> = IVanillaServerSystem>(majorVersion: number, minorVersion: number): TSystem;
    log(message: string): void;
}