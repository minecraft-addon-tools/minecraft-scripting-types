const capitalizationFixes = [
    'UI',
    'LookAt'
]
const capitalizationFixMap = new Map<string, string>();
capitalizationFixes.forEach(x => capitalizationFixMap.set(x.toLowerCase(), x));

const specialIdentifiers = new Map<string, string>();
specialIdentifiers.set("minecraft:display_chat_event", "DisplayChat");

export function minecraftIdentifierToCamelCase(identifier: string): string {
    if (specialIdentifiers.has(identifier)) return specialIdentifiers.get(identifier)!;
    return identifier.replace(/^minecraft:/, "_").replace(/_([a-z]+)/g, (x, identifierPart) => {
        if (capitalizationFixMap.has(identifierPart)) return capitalizationFixMap.get(identifierPart);
        return identifierPart[0].toUpperCase() + identifierPart.substring(1);
    });
}