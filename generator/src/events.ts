import { Event, isWellKnownType } from "minecraft-documentation-extractor";
import getType, { getTypeAsString } from "./type";
import { minecraftIdentifierToCamelCase } from "./identifiers";

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

    for (const event of events.sort((a, b) => a.name.localeCompare(b.name))) {
        const enumValueName = minecraftIdentifierToCamelCase(event.name);

        eventEnum.push(`\
/**
 * ${event.description}
 */
${enumValueName} = "${event.name}"`);

        let eventDataType: string = "any";
        if (event.type) {
            const interfaceName = `I${enumValueName}${isListening ? "EventData" : "Parameters"}`;
            eventDataType = interfaceName;
            if (isWellKnownType(event.type)) {
                eventDataType = getType(event.type);
            } else {
                const eventBody = event.type ? getTypeAsString(event.type, `component(${enumValueName})`) : "";

                interfaces.push(`\
/**
 * ${event.description}
 */
declare interface ${interfaceName} ${eventBody}`);
            }
        }

        const enumName = `${isListening ? "ReceiveFrom" : "SendTo"}Minecraft${clientOrServer}`;
        const secondParameter = functionName === "listenForEvent" ? `callback: (eventData: ${eventDataType}) => void` : `eventData: ${eventDataType}`;
        functions.push(`\
/**
 * ${event.description.replace(/\n/g, "\n * ")}
 */
${functionName}(eventIdentifier: ${enumName}.${enumValueName}, ${secondParameter}): boolean | null;`);
    }

    const resultVariableName = clientOrServer.toLowerCase() + listeningOrTriggerable;
    const functionVariableName = functionName + clientOrServer;

    values[resultVariableName + "EventEnum"] = eventEnum.join(",\n");
    values[resultVariableName + "EventInterfaces"] = interfaces.join("\n\n");
    values[functionVariableName] = functions.join("\n");
};
