import { Event, isWellKnownType, Type } from "minecraft-documentation-extractor";
import getType, { getTypeAsString } from "./type";
import { minecraftIdentifierToCamelCase } from "./identifiers";

export enum ClientServer {
    Client = "Client", Server = "Server"
}

export function extractTriggerableEvents(events: Event[], values: { [name: string]: string }, clientOrServer: ClientServer) {
    const eventEnum: string[] = [];
    const interfaces: string[] = [];
    const broadcastFunctions: string[] = [];
    const createEventDataFunctions: string[] = [];

    for (const event of events.sort((a, b) => a.name.localeCompare(b.name))) {
        eventEnum.push(defineEnumEntry(event));

        const eventDataType = getEventType(event, "Parameters", clientOrServer);
        if (eventDataType.interfaceDefinition != null) {
            interfaces.push(eventDataType.interfaceDefinition);
        }
        
        const enumName = `SendToMinecraft${clientOrServer}`;
        const enumValueName = minecraftIdentifierToCamelCase(event.name);
        broadcastFunctions.push(
            defineFunction(
                "broadcastEvent",
                event.description,
                [
                    `eventIdentifier: ${enumName}.${enumValueName}`,
                    `eventData: IEventData<${eventDataType.type}>`
                ],
                "boolean | null"
            )
        );

        createEventDataFunctions.push(
            defineFunction(
                "createEventData",
                event.description,
                [
                    `eventIdentifier: ${enumName}.${enumValueName}`
                ],
                `IEventData<${eventDataType.type}> | null`
            )
        );
    }

    const resultVariableName = `${clientOrServer.toLowerCase()}Triggerable`
    values[resultVariableName + "EventEnum"] = eventEnum.join(",\n");
    values[resultVariableName + "EventInterfaces"] = interfaces.join("\n\n");
    values[`broadcastEvent${clientOrServer}`] = broadcastFunctions.join("\n");
    values[`createEventData${clientOrServer}`] = createEventDataFunctions.join("\n");
};

export function extractListeningEvents(events: Event[], values: { [name: string]: string }, clientOrServer: ClientServer) {
    const eventEnum: string[] = [];
    const interfaces: string[] = [];
    const functions: string[] = [];

    for (const event of events.sort((a, b) => a.name.localeCompare(b.name))) {
        eventEnum.push(defineEnumEntry(event));

        const eventDataType = getEventType(event, "EventData", clientOrServer);
        if (eventDataType.interfaceDefinition != null) {
            interfaces.push(eventDataType.interfaceDefinition);
        }

        const enumName = `ReceiveFromMinecraft${clientOrServer}`;
        const enumValueName = minecraftIdentifierToCamelCase(event.name);

        functions.push(
            defineFunction(
                "listenForEvent",
                event.description,
                [
                    `eventIdentifier: ${enumName}.${enumValueName}`,
                    `callback: (eventData: IEventData<${eventDataType.type}>) => void`
                ],
                `boolean | null`
            )
        );
    }

    const resultVariableName = `${clientOrServer.toLowerCase()}Listening`;
    const functionVariableName = `listenForEvent${clientOrServer}`;

    values[resultVariableName + "EventEnum"] = eventEnum.join(",\n");
    values[resultVariableName + "EventInterfaces"] = interfaces.join("\n\n");
    values[functionVariableName] = functions.join("\n");
};

function getEventType(event: Event, interfaceSuffix: string, clientOrServer: ClientServer) {
    if (event.type) {
        const enumValueName = minecraftIdentifierToCamelCase(event.name);
        const interfaceName = `I${enumValueName}${interfaceSuffix}`;
        if (isWellKnownType(event.type)) {
            return { 
                type: getType(event.type, event.name),
                interfaceDefinition: null
            };
        } else {
            return { 
                type: interfaceName,
                interfaceDefinition: defineInterface(interfaceName, event.description, event.type, `${clientOrServer}-event(${enumValueName})`)
            };
        }
    }
    return {
        type: "any",
        interfaceDefinition: null
    }
}

function defineEnumEntry(event: Event) {
    return `\
${formatComment(event.description)}
${minecraftIdentifierToCamelCase(event.name)} = "${event.name}"`;
}

function defineInterface(name: string, description: string, type: Type, context: string) {
    const eventBody = getTypeAsString(type, context);

    return(`\
${formatComment(description)}
declare interface ${name} ${eventBody}`);
}

function defineFunction(name: string, description: string, parameters: string[], returnType: string) {
    return `\
${formatComment(description)}
${name}(${parameters.join(", ")}): ${returnType};`
}

function formatComment(description: string) {
    return `\
/**
 * ${description.replace(/\n/g, "\n * ")}
 */`
}