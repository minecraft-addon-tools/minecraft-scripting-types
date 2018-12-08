import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor";
import getType from "./type";

import { arrayComponents } from "../config.json";
const arrayComponentsSet = new Set(arrayComponents);

export default function extractComponents(documentation: MinecraftScriptDocumentation, values: { [name: string]: string }) {

    const componentEnum: string[] = [];
    const interfaces: string[] = [];

    const functions: { [name: string]: string[] } = {
        "createComponent": [],
        "getComponent": []
    };

    const componentNames: string[] = [];
    const typeNames = new Set();

    for (const component of documentation.components) {
        componentNames.push(component.name);

        const enumName = component.name.replace(/^minecraft:/, "_").replace(/_([a-z])/g, g => g[1].toUpperCase());
        componentEnum.push(`\
/**
 * ${component.description}
 */
${enumName} = "${component.name}"`);

        const interfaceName = `I${enumName}Component`;

        const parameters = component.parameters.map(parameter => {

            const type = getType(parameter.type);
            typeNames.add(parameter.type);

            return `
    /**
     * ${parameter.description.replace(/\n/g, "\n * ")}
     */
    ${parameter.name}: ${type};`;
        }).join("");

        interfaces.push(`\
/**
 * ${component.description}
 */
declare interface ${interfaceName} {${parameters}
}`);

        const isArray = arrayComponentsSet.has(component.name);
        const x = `(entity: IEntityObject, componentName: MinecraftComponent.${enumName}): ${interfaceName}${isArray ? "[]" : ""} | null;`;
        Object.keys(functions).forEach(name => {
            functions[name].push(name + x);
        });
    }

    console.log(`const componentNames = ${JSON.stringify(componentNames)};`)
    console.log(typeNames);

    values.componentEnum = componentEnum.join(",\n");
    values.componentInterfaces = interfaces.join("\n\n");
    Object.keys(functions).forEach(name => {
        values[name] = functions[name].join("\n");
    });
};
