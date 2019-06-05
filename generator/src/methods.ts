import { MinecraftScriptDocumentation, isArrayType, isWellKnownType, System, Method } from "minecraft-documentation-extractor";
import { getTypeAsString } from "./type";
import { isObject } from "util";

export default function extractMethods(documentation: MinecraftScriptDocumentation, values: { [name: string]: string }) {

    const serverSystemMethods: string[] = [];
    const clientSystemMethods: string[] = [];

    const sortSystemMethods = (a: Method, b:Method) => {
        return (a.category || "").localeCompare((b.category || "")) ||
            a.name.localeCompare(b.name);
    }

    let currentCategory = null;
    for (const method of documentation.systemMethods.sort(sortSystemMethods)) {
        var parameters: string[] = []
        var parameterDocumentation: string[] = [];
        var returnDocumentation: string[] = [];
        if (method.parameters !== undefined) {
            for (const parameter of method.parameters) {
                let pName = parameter.name.split(" ").map(n => n[0].toUpperCase() + n.substring(1)).join("");

                pName = pName[0].toLowerCase() + pName.substring(1) + (parameter.isOptional ? "?" : "");
                const pType = getTypeAsString(parameter.type, `${method.name}(${parameter.name})`)
                const pDefault = !!parameter.defaultValue ? ` = ${parameter.defaultValue}` : ""
                parameters.push(`${pName}: ${pType}${pDefault}`)
                if (parameter.description) {
                    parameterDocumentation.push(`@param ${pName} ${parameter.description}`)
                }
            }
        }

        var parameterString = parameters.join(", ");
        let returnType = "void";
        if (method.returnTypes !== undefined) {
            returnType = method.returnTypes.map(rt => {
                if (rt.description) {
                    returnDocumentation.push(`@return ${rt.value} ${rt.description}`)
                }
                if (rt.value == "object" || isObject(rt.type)) {
                    return getTypeAsString(rt.type, `${method.name}(returnType)`);
                }
                if (rt.value !== undefined && !!rt.value) {
                    return rt.value;
                }
                return "any";
            }).join(" | ");
        }
        var description = ` * ${method.description.replace("\n", "\n * ")}`
        let methodDefinition = "";
        if (currentCategory != method.category) {
            currentCategory = method.category;
            methodDefinition = `\

////////////////////////////////////////////////
// ${currentCategory}
////////////////////////////////////////////////
`
        }
        methodDefinition = methodDefinition + `\
/**
${description}${parameterDocumentation ? "\n * " + parameterDocumentation.join("\n * ") : ""}${returnDocumentation ? "\n * " + returnDocumentation.join("\n * ") : ""}
 */
${method.name}(${parameterString}): ${returnType};`

        if (method.system == System.Server || method.system == System.Both) {
            serverSystemMethods.push(methodDefinition);
        }
        if (method.system == System.Client || method.system == System.Both) {
            clientSystemMethods.push(methodDefinition);
        }
    }

    values.serverSystemMethods = serverSystemMethods.join("\n");
    values.clientSystemMethods = clientSystemMethods.join("\n");
};
