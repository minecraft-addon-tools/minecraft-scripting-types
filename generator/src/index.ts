import template from "./template";
import extractComponents from "./components";
import extractEvents from "./events";
import { ClientServer, ListeningTriggerable } from "./events";
import { debugPrintTypeNames } from "./type";
import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor";

const sourceFile = "./Documentation_Scripting.html";
const templateFiles = "./template/**";
const outputDir = "../packages";

(async () => {
    const documentation = await MinecraftScriptDocumentation.fromFile(sourceFile, { sort: true, fix: true });
    const values = {};
    extractComponents(documentation, values);

    extractEvents(documentation.events.client.listening, values, ClientServer.Client, ListeningTriggerable.Listening);
    extractEvents(documentation.events.client.triggerable, values, ClientServer.Client, ListeningTriggerable.Triggerable);
    extractEvents(documentation.events.server.listening, values, ClientServer.Server, ListeningTriggerable.Listening);
    extractEvents(documentation.events.server.triggerable, values, ClientServer.Server, ListeningTriggerable.Triggerable);
    await template(templateFiles, outputDir, values);

    debugPrintTypeNames();
})();
