import { MinecraftScriptDocumentation, isArrayType, isWellKnownType } from "minecraft-documentation-extractor";
import { getTypeAsString } from "./type";
import { minecraftIdentifierToCamelCase } from "./identifiers";

export default function extractComponents(documentation: MinecraftScriptDocumentation, values: { [name: string]: string }) {

    const componentEnum: string[] = [];
    const interfaces: string[] = [];
    const interfaceTypeMap: string[] = [];

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

        

        if (!(isWellKnownType(component.type) || (isArrayType(component.type) && isWellKnownType(component.type.type)))) {
            const componentBody = component.type ? getTypeAsString((isArrayType(component.type) ? component.type.type : component.type), `component(${enumName})`) : "";
            interfaces.push(`\
/**
 * ${component.description}
 */
declare interface ${interfaceName} ${componentBody}`);
        } else {
            let componentDataType : string;
            if (isArrayType(component.type)) {
                    componentDataType = `${getTypeAsString(component.type.type, `component(${enumName})`)}[]`;
            } else {
                    componentDataType = getTypeAsString(component.type, `component(${enumName})`);
            }

            interfaces.push(`\
/**
 * ${component.description}
 */
declare type ${interfaceName} = ${componentDataType}`);

            
        }

        interfaceTypeMap.push(`[MinecraftComponent.${enumName}]: ${interfaceName}`);
        const x = `(entity: IEntity, componentName: MinecraftComponent.${enumName}): IComponent<${interfaceName}> | null;`;
        Object.keys(functions).forEach(name => {
            functions[name].push(name + x);
        });
    }

    values.componentEnum = componentEnum.join(",\n");
    values.componentInterfaces = interfaces.join("\n\n");
    values.interfaceTypeMap = interfaceTypeMap.join(",\n");
    Object.keys(functions).forEach(name => {
        values[name] = functions[name].join("\n");
    });
};
