import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor";
import getType from "./type";

const arrayComponentsSet = new Set([
    "minecraft:damage_sensor",
    "minecraft:interact"
]);

export default function extractComponents(documentation: MinecraftScriptDocumentation, values: { [name: string]: string }) {

    const componentEnum: string[] = [];
    const interfaces: string[] = [];

    const functions: { [name: string]: string[] } = {
        "createComponent": [],
        "getComponent": []
    };

    for (const component of documentation.components) {
        const enumName = component.name.replace(/^minecraft:/, "_").replace(/_([a-z])/g, g => g[1].toUpperCase());
        componentEnum.push(`\
/**
 * ${component.description}
 */
${enumName} = "${component.name}"`);

        const interfaceName = `I${enumName}Component`;

        const parameters = (component.parameters || []).map(parameter => {

            const type = getType(parameter.type);

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
declare interface ${interfaceName} extends IComponent {${parameters}
}`);

        const isArray = arrayComponentsSet.has(component.name);
        const x = `(entity: IEntityObject, componentName: MinecraftComponent.${enumName}): ${interfaceName}${isArray ? "[]" : ""} | null;`;
        Object.keys(functions).forEach(name => {
            functions[name].push(name + x);
        });
    }

    values.componentEnum = componentEnum.join(",\n");
    values.componentInterfaces = interfaces.join("\n\n");
    Object.keys(functions).forEach(name => {
        values[name] = functions[name].join("\n");
    });
};
