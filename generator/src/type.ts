const typeMap: { [typeName: string]: string } = {
    "string": "string",
    "decimal": "number",
    "integer": "number",
    "boolean": "boolean",
    "json object": "any",
    "array": "any[]",
    "list": "any[]",
    "range [a, b]": "[number, number]",
    "vector [a, b, c]": "[number, number, number]",
    "entity js api object": "IEntityObject"
};

const allTypeNames = new Set();

export default function getType(typeName: string): string {
    allTypeNames.add(typeName);
    return typeMap[typeName.toLowerCase()] || "any";
}

export function debugPrintTypeNames() {
    console.log(allTypeNames);
}
