# Change Log

All notable changes to the "vscode-pets" extension will be documented in this file.

## [1.2.0]

- Now with themes! Configure `vscode-pets.theme` to `"forest"` and let your pets play in a spooky forest.
- [bugfix] rubber duck is correctly animated
- [bugfix] cats will no longer chase the ball when hanging off the wall

## [1.1.1]

- Clippy is now available in Yellow (thanks Marc Duiker)

## [1.1.0]

- Added the choice of having the pets panel as an editor tab (current default), or as a panel in the explorer view. You can also drag the explorer tab to the left to have it pinned as a side-bar shortcut.

## [1.0.0]

- Added the ability to spawn multiple pets through the `vscode-pets.spawn-pet` command
- Fixed an annoying bug that would create multiple panels when you modify the pet settings
- Pet panel saves its state when taken out of focus (you click on another tab)
- Pets will randomize their starting positions
- Additional pets will persist across global state (restarting Code)
- Additional pets will persist across multiple computers if you have Settings Sync enabled

## [0.11.0]

- Added a rubber duck as a new pet. Talk with them while debugging your code!

## [0.10.0]

- Clippy can now be selected with different colored baseball caps.
- Clippy will now also skateboard 🛹

## [0.9.0]

- Rewrote the animation sequence for the pets from a simple loop into a Bayesian network (they act a bit more randomly).

## [0.8.0]

- Clippy will now chase a ball if you throw it

## [0.7.0]

- Added a new pet(?) "clippy", the Microsoft paperclip

## [0.6.0]

- Added an option to make the pets bigger! vscode-pets.petSize can be nano (default), medium or large
- Fixed a bug if the user put an invalid configuration option it would fail to render pets.
- Fixed a bug for a missing animation of the black cat swiping the mouse cursor.

## [0.5.0]

- Added snake

## [0.4.0]

- Cats and dogs will chase balls

## [0.3.0]

- Animals interact with mouse

## [0.2.0]

- Added dogs. They won't climb the wall

## [0.1.0]

- Added a brown cat and the ability to configure the color
