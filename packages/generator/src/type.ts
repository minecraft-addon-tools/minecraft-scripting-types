import { typeMap } from "../config.json";
const typeMap2 = typeMap as { [typeName: string]: string };

export default function getType(typeName: string): string {
    return typeMap2[typeName.toLowerCase()] || "any";
}