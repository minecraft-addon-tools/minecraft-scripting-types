# minecraft-scripting-types

***This API is still in development and may break with updates until things stabilize***

Mojang provides modding capabilities via JavaScript. This project aims to bring the Type safety of TypeScript to the Bedrock Scripting Engine

This readme is not a replacement for the API documentation, which should still be your primary source of information. See: [https://minecraft.gamepedia.com/Bedrock_Beta_Script_Documentation](https://minecraft.gamepedia.com/Bedrock_Beta_Script_Documentation)

## Pre-Requisites

So you want to make your own Scripts? That's awesome! In this section you will find the list of minimum and recommended software you will need.

| Software    | Minimum                                     | Recommended                                               | 
| ----------- | ------------------------------------------- | --------------------------------------------------------- | 
| Code Editor | Visual Studio Code or any plain-text editor | Visual Studio Community 2017 with the following components installed: 'JavaScript diagnostics', 'JavaScript and TypeScript language support', 'Just-In-Time debugger' |
| Debugger    | N/A                                         | Visual Studio Community 2017                              |
| Minecraft   | Minecraft on your Windows 10 device         | Minecraft on your Windows 10 device                       |
| Other       | Vanilla Behavior Pack available from https://aka.ms/minecraftscripting_behaviorpack | Vanilla Behavior Pack available from https://aka.ms/minecraftscripting_behaviorpack |
| Storage     | 1.0 GB of free space for text editor, game, and scripts | 3.0 GB of free space for Visual Studio, game, and scripts |
| Node.js     | 8.x                                         | 10.x                                                      |

## Getting Started
First you will need to download the latest Vanilla Behavior Pack. You can get this from the following link: https://aka.ms/minecraftscripting_behaviorpack
Once you have downloaded the Behavior Pack, unzip it to a folder. Inside the Behavior Pack you will find the scripts folder which contains all the scripting files you want to run.

In the scripts folder you will find two folders: one for client scripts and one for server scripts.

-Server Scripts: These scripts run on the server side of the game. This includes spawning new entities, adding components, or modifying components on an entity.

-Client Scripts: These scripts run on each individual player's side of the game. This is a good place to respond to events and manage anything specific to the player.

Once you have chosen whether you are making a client or server script, simply add a new blank text file with .js extension to the appropriate folder, and open it in your preferred code editor. Then code away! You can have as many or as few JavaScript files as you want here (the name of the files doesn't matter) and they will all be run independently of each other!

NOTE: For scripts to be run by the game, you need to enable Experimental Gameplay on the world where you will run scripts on. This will be necessary while scripting is still in beta.

### Folder Structure
* vanilla_behavior_pack
  * scripts
    * client
      * myClientScript.js
    * server
      * myServerScript.js
  * manifest.json
  * pack_icon.png

## Adding TypeScript support
To add support for compiling with TypeScript, you'll need to create an NPM module, you can do this on the command line by navigating to your mod's directory and typing

```
npm init
```

This will guide you through creating an NPM module, but an absolute minimum module should look something like this:

```json
{
  "private": "true"
}
```

This is a node module that is not intended to be published, but can be used for dependency management.

*This repository is not currently available on NPM, so you must install it using the GitHub repository. It will be made available on NPM once we have figured out how to license this and how we're going to version it*

Now add TypeScript and MinecraftScriptingTypeScript (this project) using NPM, replacing `<commit>` with the current commit ID from this repository (e.g., `5d8ee06b3be36e20c8c531ad418ce8e250abc2ac`)

```cmd
npm install --save-dev TypeScript
npm install --save-dev github:atomicblom/MinecraftScriptingTypeScript#<commit>
```

Next we just need to add a script to compile the project, which can be done by adding a "compile" script with the command `tsc -p .` which compiles the current project.

#### Example package.json
The final package.json should look something like this:
```json
{
  "private": "true",
  "scripts": {
    "compile": "tsc -p ."
  },
  "dependencies": {
    "minecraft-scripting-types": "github:atomicblom/minecraft-scripting-types#5d8ee06b3be36e20c8c531ad418ce8e250abc2ac",
    "typescript": "^3.1.3"
  }
}
```

The project will not compile however until we add a tsconfig.json file, here is an example one that was used to write Beanstalk

#### Example tsconfig.json
```json
{
    "compilerOptions": {
        "module": "ES6",
        "noImplicitAny": true,
        "types": [
            "minecraft-scripting-types"
        ]
    },
    "include": [
        "scripts/client/*",
        "scripts/server/*",
    ],
    "exclude": [
        "node_modules"
    ]
}
```

The last step will be to rename the `.js` files in `scripts/**/*.js` to `.ts` files.

You should now be able to build your project using
```
npm run compile
```
It will generate .js files next to the typescript files which Minecraft will happily load.

## API Differences when using this typing

Below we will detail the differences (and benefits that using these typings provide)

### Namespace your client and server systems

You should make use of TypeScript namespaces in order to prevent TypeScript from thinking that your client and servers scripts from thinking that they both exist in the same global space. If you do not namespace your project, you may see unusual errors caused by variable or type collisions.

namespacing should be as simple as wrapping your script like this:

```typescript
namespace Server {
    ...
    /// Your code goes here
    ...    
}
```

### Getting type information for an extended system

The Mojang demonstrations create a system and them assigns additional methods to them in such a way that TypeScript does not detect methods being available on the system.

If you do not intend to use this behaviour (perhaps your logic will be in methods, loose in the namespace you defined with the above hint), then you can simply register a plain system:

```typescript
namespace Server {
    const system = server.registerSystem(0, 0);
}
```

If you need to declare additional methods or properties on your system, you can subclass `IServerSystem<T>` in order to pre-define the shape of your system.

Note: although the demos from Mojang do this, we do not recommend it.

```typescript
namespace Server {
    interface IMyCustomModSystem extends IServerSystem<IMyCustomModSystem> {
        // defining a pretend variable "this" with the type of your system will help TypeScript to 
        // know that you can use "this." to get at the properties.
        notifyPlayer(this: IMyCustomModSystem, player: IEntityObject): void;
        players: IEntityObject[];
    }

    const system: IMyCustomModSystem = server.registerSystem<IMyCustomModSystem>(0, 0);

    system.initialize = function() {
        //... initialze
    }

    system.notifyPlayer = function(player: IEntityObject): void {
        this.players.push(player);
        // If you don't want to define "this: IMyCustomModSystem" in the declaration, you can always just refer to the
        // registered system:
        
        //system.players.push(player);
    }

    //... continue adding more code
}
```

You can subclass `IClientSystem` in a similliar way.

### Improved type detection for built-in components and events

Minecraft's built-in components have all been defined in the `MinecraftComponent` enum, when you use one of these enum values with an API such as `getComponent()` you will be given an appropriate definition for the component that you are asking for.

```typescript
    system.update = function() {
        const player = //... resolving player here
        const position = this.getComponent(player, MinecraftComponent.Position);
        // position will be IPositionComponent
        server.log(`x: ${position.x}, y: ${position.y}, z: ${position.z}`)
    }
```

For custom components, overloads for specific components will not be available and you will need to specify the expected return type.

```typescript
    interface IAwesomeComponent {
        isAwesome: bool;
    }

    system.update = function() {
        const player = //... resolving player here
        const awesomeComponent = this.getComponent<IAwesomeComponent>(player, "demo_mod:awesome_component");

        // awesomeComponent will be IAwesomeComponent
        server.log(`isAwesome: ${awesomeComponent.isAwesome}`);
    }
```

these overloads will also be available for events in the near future, but are not yet implemented.

### Source Mapping
Source mapping is not currently available, you will unfortunately need to get used to debugging with the compiled JavaScript files. 

A feedback item is pending approval for this feature.
