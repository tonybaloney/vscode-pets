# Getting Started with VS Code Pets

Congrats on installing joy! Enjoy interacting with these cute pixelated pets.
Read below to get a full understanding of this extension.
Not convinced? Watch our extension spotlight on [Visual Studio Code](https://www.youtube.com/watch?v=aE6Ifj_KstI).

## Start pet coding session to show your pet

Open the command palette with `Ctrl+Shift+P` on Windows/Linux or `Cmd(⌘)+Shift+P` on MacOS.  

Run the "Start pet coding session" command (`vscode-pets.start`)

Once you have the pet panel open, you can:

* [Changing your pet](#changing-your-pet)
* [Place the pet's window](#place-the-pets-window)
* [Playing with pets](pets.md#playing-with-pets)
* [Adding additional pets](pets.md#adding-additional-pets)
* [Throwing a ball](pets.md#throwing-a-ball)
* [Roll-call with your pets](pets.md#roll-call-with-your-pets)
* [Removing a single pet or multiple pets](pets.md#removing-a-single-pet-or-multiple-pets)
* [Importing or Exporting your Pet List](pets.md#importing-or-exporting-your-pet-list)
* [Change the background with themes](themes.md)

## Changing your pet

Open the setting panel with `Ctrl+,` on Windows/Linux or `Cmd(⌘)+,` on MacOS. In the search bar, enter “vscode-pets” to see all available options.

Set a default color, size, pet type, position, and theme when you open a Pet Panel.

* Pet Color: depends on the selected pet. See [Cat coat options](#cat-coat-options) for all available cat colors.
* Pet Size: nano, small, medium, large
* Pet Type: cat, chicken, crab, clippy, cockatiel, dog, horse, mod, rocky, rubber duck, snake, totoro, turtle, zappy

![Usage screenshot](source/_static/screenshot-2.gif)

### Restrictions

* Snake can only be green
* Rubber duck & Zappy can only be yellow
* Ferris the crab can only be red
* Rocky can only be gray
* Mod can only be purple

### Cat coat options

Cats support the following values for the `vscode-pets.petColor` setting:

| Coat | Available colors |
| --- | --- |
| Solid | `black`, `blue`, `solid_white`, `chocolate`, `cream` |
| Tabby | `brown_tabby`, `silver_tabby`, `ginger_tabby`, `cream_tabby` |
| Bicolor | `white` (tuxedo), `gray_white`, `ginger_white`, `tabby_white` |
| Tortoiseshell | `tortoiseshell`, `dilute_tortie` |
| Calico | `calico`, `dilute_calico` |
| Colorpoint | `seal_point`, `blue_point` |
| Other original colors | `brown`, `gray`, `lightbrown`, `orange` |

The original `white` option remains the black-and-white tuxedo cat for compatibility
with saved pets. Choose `solid_white` for an all-white cat.

## Place the pet's window

To switch the pet's window between *explorer (default)* and *panel*, you can use the command `vscode-pets.position`.
Or in the setting panel the option `Position`.

![Position setting](source/_static/position-setting.png)

**Explorer**:

![Position explorer](source/_static/position-explorer.png)

**Panel**:

![Position panel](source/_static/position-panel.png)
