import template from "./template";
import * as fs from "fs";
import extractComponents from "./components";
import { extractListeningEvents, extractTriggerableEvents} from "./events";
import { ClientServer } from "./events";
import { debugPrintTypeNames } from "./type";
import { MinecraftScriptDocumentation, applyOverrides, IScriptingDocumentationOverrides } from "minecraft-documentation-extractor";
import extractMethods from "./methods";

const sourceFile = "./Documentation_Scripting.html";
const templateFiles = "./template/**";
const outputDir = "../packages";

(async () => {
    const documentation = await MinecraftScriptDocumentation.fromFile(sourceFile, { sort: true, fix: true });
    const overrides = <IScriptingDocumentationOverrides>JSON.parse(await fs.promises.readFile("./typing-overrides.json", "utf8"));
    applyOverrides(documentation, overrides);
    const values = {};

    extractMethods(documentation, values);

    extractComponents(documentation, values);

    extractListeningEvents(documentation.events.client.listening, values, ClientServer.Client);
    extractTriggerableEvents(documentation.events.client.triggerable, values, ClientServer.Client);
    extractListeningEvents(documentation.events.server.listening, values, ClientServer.Server);
    extractTriggerableEvents(documentation.events.server.triggerable, values, ClientServer.Server);

    await template(templateFiles, outputDir, values);

    debugPrintTypeNames();
})();
