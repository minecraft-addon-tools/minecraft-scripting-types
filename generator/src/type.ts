const typeMap: { [typeName: string]: string } = {
    "string": "string",
    "decimal": "number",
    "integer": "number",
    "boolean": "boolean",
    "json object": "any",
    "array": "any[]",
    "list": "any[]",
    "range [a, b]": "[number, number]",
    "vector [a, b, c]": "[number, number, number]"
};

export default function getType(typeName: string): string {
    return typeMap[typeName.toLowerCase()] || "any";
}