import { MinecraftScriptDocumentation, isArrayType } from "minecraft-documentation-extractor";
import { getTypeAsString } from "./type";
import { minecraftIdentifierToCamelCase } from "./identifiers";

export default function extractComponents(documentation: MinecraftScriptDocumentation, values: { [name: string]: string }) {

    const componentEnum: string[] = [];
    const interfaces: string[] = [];

    const functions: { [name: string]: string[] } = {
        "createComponent": [],
        "getComponent": []
    };

    for (const component of documentation.components.sort((a, b) => a.name.localeCompare(b.name))) {
        const enumName = minecraftIdentifierToCamelCase(component.name);
        
        componentEnum.push(`\
/**
 * ${component.description}
 */
${enumName} = "${component.name}"`);

        const interfaceName = `I${enumName}Component`;

        const componentBody = component.type ? getTypeAsString((isArrayType(component.type) ? component.type.type : component.type), `component(${enumName})`) : "";

        interfaces.push(`\
/**
 * ${component.description}
 */
declare interface ${interfaceName} ${componentBody}`);

        const x = `(entity: IEntity, componentName: MinecraftComponent.${enumName}): IComponent<${interfaceName}>${isArrayType(component.type) ? "[]" : ""} | null;`;
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
