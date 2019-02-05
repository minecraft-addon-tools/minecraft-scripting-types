import template from "./template";
import extractComponents from "./components";
import extractEvents from "./events";
import { ClientServer, ListeningTriggerable } from "./events";
import { debugPrintTypeNames } from "./type";
import { MinecraftScriptDocumentation } from "minecraft-documentation-extractor";

import axios, { AxiosRequestConfig } from 'axios';
import { createWriteStream, promises as fsPromises } from 'fs';
import * as path from 'path';
import { Parse } from "unzip";

const sourceUrl = "https://aka.ms/MinecraftBetaBehaviors";
const sourceDir = "./source_docs";
const sourceFile = "./Documentation_Scripting.html";
const templateFiles = "./template/**";
const outputDir = "../packages";

(async () => {
    try {
        try {
            // I could do this with stat, but that just throws an exception if the directory doesn't exist, so as long as 
            // I'm dealing with exceptions, I may as well just create the directory.
            await fsPromises.mkdir(sourceDir);
        } catch { }

        const documentationFile = path.join(sourceDir, sourceFile);

        try {
            await fsPromises.stat(documentationFile);
            console.log(`Using existing documentation from ${documentationFile}`);
        } catch {
            console.log(`Downloading documentation from ${sourceUrl}`);
            const response = await axios.get(sourceUrl, <AxiosRequestConfig>{
                responseType: "stream"
            });
            await new Promise((resolve, reject) => {
                response.data
                    .pipe(Parse())
                    .on('entry', function (entry: any) {
                        var fileName: string = entry.path;
                        if (fileName.match(/[a-zA-Z_]*\.html/)) {
                            console.log(`\t${fileName}`);
                            entry.pipe(createWriteStream(path.join(sourceDir, fileName)));
                        } else {
                            entry.autodrain();
                        }
                    })
                    .on('close', () => resolve())
                    .on('error', (err: Error) => {
                        console.log(err);
                        reject(err);
                    })
            });
            console.log(`Documentation retrieved.`);
        }

        console.log(`Reading Documentation`);
        const documentation = await MinecraftScriptDocumentation.fromFile(sourceFile, { sort: true, fix: true });

        console.log(`Parsing Documentation`);
        const values = {};
        extractComponents(documentation, values);
        extractEvents(documentation.events.client.listening, values, ClientServer.Client, ListeningTriggerable.Listening);
        extractEvents(documentation.events.client.triggerable, values, ClientServer.Client, ListeningTriggerable.Triggerable);
        extractEvents(documentation.events.server.listening, values, ClientServer.Server, ListeningTriggerable.Listening);
        extractEvents(documentation.events.server.triggerable, values, ClientServer.Server, ListeningTriggerable.Triggerable);
        console.log(`Writing types`);
        await template(templateFiles, outputDir, values);

        debugPrintTypeNames();
    } catch (error) {
        console.log(error);
    }
})();
