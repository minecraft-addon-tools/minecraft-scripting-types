import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor";
import getType from "./type";

export default function extractEvents(events: MinecraftScriptDocumentation.Event[], values: { [name: string]: string }, enumName: string, functionName: string, resultVariableName: string, functionVariableName: string) {

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
            const interfaceName = `I${enumValueName}EventData`;
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

        const secondParameter = functionName === "listenForEvent" ? `callback: (eventData: ${eventDataType}) => void` : `eventData: ${eventDataType}`;
        functions.push(`${functionName}(eventIdentifier: ${enumName}.${enumValueName}, ${secondParameter}): boolean | null;`);
    }

    values[resultVariableName + "EventEnum"] = eventEnum.join(",\n");
    values[resultVariableName + "EventInterfaces"] = interfaces.join("\n\n");
    values[functionVariableName] = functions.join("\n");
};
