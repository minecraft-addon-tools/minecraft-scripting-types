import { Event } from "minecraft-documentation-extractor";
import getType from "./type";

export enum ClientServer {
    Client = "Client", Server = "Server"
}

export enum ListeningTriggerable {
    Listening = "Listening", Triggerable = "Triggerable"
}

export default function extractEvents(events: Event[], values: { [name: string]: string }, clientOrServer: ClientServer, listeningOrTriggerable: ListeningTriggerable) {
    const isListening = listeningOrTriggerable === ListeningTriggerable.Listening;
    const functionName = isListening ? "listenForEvent" : "broadcastEvent";

    const eventEnum: string[] = [];
    const interfaces: string[] = [];
    const functions: string[] = [];

    for (const event of events) {

        const enumValueName = event.name.replace(/^minecraft:/, "_").replace(/_([a-z])/g, g => g[1].toUpperCase());
        eventEnum.push(`\
/**
 * ${event.description}
 */
${enumValueName} = "${event.name}"`);

        let eventDataType: string = "any";
        if (event.parameters) {
            const interfaceName = `I${enumValueName}${isListening ? "EventData" : "Parameters"}`;
            eventDataType = interfaceName;
            const parameters = event.parameters.map(parameter => `
    /**
     * ${parameter.description.replace(/\n/g, "\n * ")}
     */
    ${parameter.name}: ${getType(parameter.type)};`).join("");

            interfaces.push(`\
/**
 * ${event.description}
 */
declare interface ${interfaceName} {${parameters}
}`);
        }

        const enumName = `${isListening ? "ReceiveFrom" : "SendTo"}Minecraft${clientOrServer}`;
        const secondParameter = functionName === "listenForEvent" ? `callback: (eventData: ${eventDataType}) => void` : `eventData: ${eventDataType}`;
        functions.push(`${functionName}(eventIdentifier: ${enumName}.${enumValueName}, ${secondParameter}): boolean | null;`);
    }

    const resultVariableName = clientOrServer.toLowerCase() + listeningOrTriggerable;
    const functionVariableName = functionName + clientOrServer;

    values[resultVariableName + "EventEnum"] = eventEnum.join(",\n");
    values[resultVariableName + "EventInterfaces"] = interfaces.join("\n\n");
    values[functionVariableName] = functions.join("\n");
};
