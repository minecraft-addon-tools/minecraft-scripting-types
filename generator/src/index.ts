import template from "./template";
import extractComponents from "./components";
import extractEvents from "./events";
import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor"

import { sourceFile, templateDir, outputDir } from "../config.json";

(async () => {

    const documentation = await MinecraftScriptDocumentation.fromFile(sourceFile);

    const values = {};
    extractComponents(documentation, values);
    extractEvents(documentation.events.client.listening, values,
        "MinecraftClientEvent", "listenForEvent", "clientListening", "listenForEventClient");
    extractEvents(documentation.events.client.triggerable, values,
        "BroadcastableClientEvent", "broadcastEvent", "clientTriggerable", "broadcastEventClient");
    extractEvents(documentation.events.server.listening, values,
        "MinecraftServerEvent", "listenForEvent", "serverListening", "listenForEventServer");
    extractEvents(documentation.events.server.triggerable, values,
        "BroadcastableServerEvent", "broadcastEvent", "serverTriggerable", "broadcastEventServer");
    await template(templateDir, outputDir, values);

})();