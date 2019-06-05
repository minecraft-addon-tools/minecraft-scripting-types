import { Type, isWellKnownType, isArrayType, isUnionType, Field } from "minecraft-documentation-extractor";

const typeMap: Map<string, string> = new Map(Object.entries({
    "string": "string",
    "decimal": "number",
    "integer": "number",
    "boolean": "boolean",
    "json object": "any",
    "array": "any[]",
    "list": "any[]",
    "range [a, b]": "Range",
    "vector [a, b, c]": "VectorArray",
    "vector {x, y, z}": "VectorXYZ",
    "minecraft filter": "MinecraftFilter",
    "block js api object": "IBlock",
    "component js api object": "IComponent<any>",
    "entity js api object": "IEntity",
    "entity ticking area js api object": "IEntityTickingArea",
    "itemstack js api object": "IItemStack",
    "minecraft trigger object": "MinecraftTrigger",
    "minecraft trigger": "MinecraftTrigger | string",
    "sound identifier": "string",
    "ticking area js api object": "ITickingArea",
    "entity identifier": "string",
    "particle identifier": "ParticleEffect",
    "dimension name": "Dimension",
    "null": "null",

    "execute command callback": "(callback: IExecuteCommandCallback) => void"
}));

const allTypeNames = new Set();

export default function getType(typeName: string, context: string): string {
    allTypeNames.add(typeName);
    let type = typeMap.get(typeName.toLowerCase());
    if (!type) {
        console.warn(`[${context}] Unexpected type encountered: ${typeName.toLowerCase()}`);
        return "any";
    }
    return type;
}

export function debugPrintTypeNames() {
    console.log(allTypeNames);
}

export function getField(field: Field, parameterPath: string, indent: number): string {
    let name = field.name;
    if (field.isOptional) {
        name = `${name}?`;
    }
    
    let defaultComment = "";
    if (field.defaultValue) {
        defaultComment = `\n\t * @default ${field.defaultValue}`;
    }

    const type = getTypeAsString(field.type, `${parameterPath.substring(0, parameterPath.length - 1)}.${field.name})`, indent + 1)

    return `
\t/**
\t * ${field.description.replace(/\n/g, "\n\t * ")}${defaultComment}
\t */
\t${name}: ${type};`.replace(/\t/g, "    ".repeat(indent));
}

export function getTypeAsString(type: Type, parameterPath: string, indent: number = 1): string {
    if (!type) return "";
    if (isWellKnownType(type)) {
        return getType(type, parameterPath);
    }
    if (isArrayType(type)) {
        const innerType = getTypeAsString(type.type, parameterPath, indent);
        return `${innerType}[]`;
    }
    if (isUnionType(type)) {
        return type.unionTypes
            .map(ut => getTypeAsString(ut, parameterPath, indent))
            .join(" | ");
    }
    const childParameters = type.fields
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(p => getField(p, `${parameterPath.substring(0, parameterPath.length - 1)}.${p.name})`, indent))
            .join("");
    return `{${childParameters}\n${"    ".repeat(indent - 1)}}`;
}
