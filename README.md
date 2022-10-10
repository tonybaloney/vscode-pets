# VS Code Pets

![icon](https://github.com/tonybaloney/vscode-pets/raw/master/icon.png)

Puts a small, bored cat, an enthusiastic dog, a feisty snake, a rubber duck, or Clippy 📎 in your code editor.

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/tonybaloney.vscode-pets?color=blue&logo=visual-studio)](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets&WT.mc_id=python-17801-anthonyshaw)

Run the "Start pet coding session" action to see the panel.

![screenshot](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/screenshot.gif)

## Installation

Get from the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets&WT.mc_id=python-17801-anthonyshaw).

OR

With VS Code open, search for `vscode-pets` in the extension panel (`Ctrl+Shift+X` on Windows/Linux or `Cmd(⌘)+Shift+X` on MacOS) and click install.

OR

With VS Code open, launch VS Code Quick Open (`Ctrl+P` on Windows/Linux or `Cmd(⌘)+P` on MacOS), paste the following command, and press enter.

`ext install tonybaloney.vscode-pets`

## Showing your pet
Open the command palette with `Ctrl+Shift+P` on Windows/Linux or `Cmd(⌘)+Shift+P` on MacOS.  

Run the "Start pet coding session" command (`vscode-pets.start`)

## Configuring your pet

You can choose either pet type and pet color:

![screenshot2](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/screenshot-2.gif)

* Snake can only be green
* Rubber duck & Zappy can only be yellow
* Ferris the crab can only be red
* Rocky can only be gray

## Playing

Pets will interact with you within the open Pet Panel.

![screenshot3](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/screenshot-3.gif)

## Throwing a ball

Play catch with your pet! Run the "Throw ball" command (`vscode-pets.throw-ball`).

* Rocky will not run & catch a ball. Have you ever seen a rock run after a ball? Neither have we.

![screenshot4](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/screenshot-4.gif)

## Adding extra pets

Run the "Spawn additional pet" command (`vscode-pets.spawn-pet`) and select the pet type and color.

Extra pets will not persist between closing and restarting VS Code.

## Removing pets

You can remove all pets (except the 1 configured) by running the "Remove all pets" command (`vscode-pets.delete-pets`) from the command palette.

You can remove specific pets by running the "Remove pet" command (`vscode-pets.delete-pet`) from the command palette.

## Themes

Configure `vscode-pets.theme` to `"forest"` and let your pets play in a spooky forest.

![forest](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/forest.gif)

Set `vscode-pets.theme` to `"castle"` for them to roam the ramparts!

![castle](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/castle.gif)

Set `vscode-pets.theme` to `"beach"` for your friends to play by the ocean.

![beach](https://github.com/tonybaloney/vscode-pets/raw/master/screenshots/beach-pose.png)

## More options

From the VSCode preferences, search for **vscode-pets** for more options. In particular you can move the panel to the sidebar, or change the pet type and theme.

## Contributing

### Ideas and discussion

Have an awesome idea for a new feature? Please [open an issue](https://github.com/tonybaloney/vscode-pets/issues/new) describing your idea! You can also help by reviewing some of the [existing ideas](https://github.com/tonybaloney/vscode-pets/issues) and leaving your opinion.

### Reporting bugs

Something is not working as it should? Please [open an issue](https://github.com/tonybaloney/vscode-pets/issues/new) giving as much information as you can. Writing an effective bug report is a valueable skill as a Software Engineer, refer to the given example below for advice.

**Title** - Clearly summarize what the bug is with specific details.  
**Summary** - If the title is too long, include a summary with additional details.  
**Visual/Screenshot** - A picture is always worth the time. Include one if possible.  
**Expected/Actual Results** - Explain what you expected to happen and what actually happened.  
**Steps to Reproduce** - The steps to follow should be comprehensive, easy to understand, and short. We want to experience the bug first-hand.  
**Environment** - Share the current version information by copying from `Help` and clicking `About`.
```
Version: 1.72.0  
Commit: 64bbfbf67ada9953918d72e1df2f4d8e537d340e  
Date: 2022-10-04T23:20:47.539Z
Electron: 19.0.17
Chromium: 102.0.5005.167
Node.js: 16.14.2
V8: 10.2.154.15-electron.0
OS: Linux x64 5.19.12-200.fc36.x86_64
Sandboxed: No
```

### Write code

Want to contribute to vscode-pets? Feel free to [fork the repository](https://github.com/tonybaloney/vscode-pets/fork) and submit a pull request.

#### Testing the changes

-   Run `npm install`.
-   Run `npm run compile`.
-   Go to the debug panel on the sidebar and launch the development version with the extension loaded (first option in the debug profiles).
-   Refer to [VS Code Extension Documentation](https://code.visualstudio.com/api) for additional resources.

## Credits

The cat and dog media assets for this extension were licensed from itch.io.

[Marc Duiker](https://twitter.com/marcduiker) created the Clippy, Rocky, Zappy, rubber duck, snake, cockatiel, and Ferris the crab media assets.

[Karen Rustad Tölva](https://www.aldeka.net) designed the original concept of Ferris the crab.

## Thank you

Thanks to all the contributors to this project:

-   [@marcduiker](https://github.com/marcduiker)
-   [@Vicente015](https://github.com/Vicente015)
-   [@Yukaii](https://github.com/Yukaii)
-   [@robconery](https://github.com/robconery)
-   [@JING1201](https://github.com/JING1201)
-   [@aclaughan](https://github.com/aclaughan)
-   [@Tarang74](https://github.com/Tarang74)
-   [@Harry-Hopkinson](https://github.com/Harry-Hopkinson)
