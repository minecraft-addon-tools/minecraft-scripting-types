/**
 * (Server-side) Events that can be sent to Minecraft to achieve an effect. 
 */
declare const enum SendToMinecraftServer {
    $$serverTriggerableEventEnum$$
}

/**
 * (Server-side) Events that can be received from Minecraft
 */
declare const enum ReceiveFromMinecraftServer {
    $$serverListeningEventEnum$$
}

$$serverListeningEventInterfaces$$

$$serverTriggerableEventInterfaces$$
