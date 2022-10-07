# Change Log

All notable changes to the "vscode-pets" extension will be documented in this file.

## [1.14.0]

## New Features

* Add Roll Call command by @Harry-Hopkinson in https://github.com/tonybaloney/vscode-pets/pull/175
* Add the ability to set a custom name for a pet by @ccjmne in https://github.com/tonybaloney/vscode-pets/pull/176
* Fix Pet's not spawning when cancelling the operation. by @Harry-Hopkinson in https://github.com/tonybaloney/vscode-pets/pull/182

* split cat and dog names by @tonybaloney in https://github.com/tonybaloney/vscode-pets/pull/147
* Update names.ts by @GorillaTV in https://github.com/tonybaloney/vscode-pets/pull/150
* Update names.ts by @jasminejell in https://github.com/tonybaloney/vscode-pets/pull/151
* Update names.ts by @MerryHoppins in https://github.com/tonybaloney/vscode-pets/pull/152
* remove simba from dog names by @GorillaTV in https://github.com/tonybaloney/vscode-pets/pull/154
* added amelia, crabito, big fella, peaches, quackers and pebble by @jasminejell in https://github.com/tonybaloney/vscode-pets/pull/153
* I added Jemima, Bolty and Beaky by @MerryHoppins in https://github.com/tonybaloney/vscode-pets/pull/155
* I have added Hissy Elliot by @MerryHoppins in https://github.com/tonybaloney/vscode-pets/pull/156
* Added Kanye nest by @jasminejell in https://github.com/tonybaloney/vscode-pets/pull/158
* Add Dame Judi Finch by @GorillaTV in https://github.com/tonybaloney/vscode-pets/pull/160
* I added Baquack Obama by @MerryHoppins in https://github.com/tonybaloney/vscode-pets/pull/159
* Removed 'Purfect' from DOG NAMES by @jasminejell in https://github.com/tonybaloney/vscode-pets/pull/163
* I added Rocksanne and Rockstar by @GorillaTV in https://github.com/tonybaloney/vscode-pets/pull/165
* removed the un-cat names by @pranayjalan254 in https://github.com/tonybaloney/vscode-pets/pull/164
* Removed some un-dog-like names by @slayeh17 in https://github.com/tonybaloney/vscode-pets/pull/166
* Throttling frame rate for consistent ball animation by @sakatam in https://github.com/tonybaloney/vscode-pets/pull/167
* add: new dog name called 'Ein' by @Kiotlin in https://github.com/tonybaloney/vscode-pets/pull/169
* More integration testing by @tonybaloney in https://github.com/tonybaloney/vscode-pets/pull/168
* names: Add New cat name by @Divyanshu-Modi in https://github.com/tonybaloney/vscode-pets/pull/170
* Add links to contributors' section by @willtheorangeguy in https://github.com/tonybaloney/vscode-pets/pull/171
* added Maddy as Dog and Jelly Beans as Duck by @Chirag-18 in https://github.com/tonybaloney/vscode-pets/pull/174
* (names.ts) add crab names by @JavaVista in https://github.com/tonybaloney/vscode-pets/pull/178

## [1.13.3]

- Raise a more meaningful error when the explorer window is closed and a command is run by @tonybaloney in https://github.com/tonybaloney/vscode-pets/pull/145

## [1.13.2]

- Fix the remove-all-pets command. by @Harry-Hopkinson in https://github.com/tonybaloney/vscode-pets/pull/133

## [1.13.1]

- Fixes Spawning pet in explorer opens panel by @tonybaloney in https://github.com/tonybaloney/vscode-pets/pull/132

## [1.13.0]

- Fix the remove all pets command. Credit @Harry-Hopkinson
- Fix error while spawning pet. Credit @Harry-Hopkinson

## [1.12.0]

- Added a "delete pet" command, `vscode-pets.delete-pet`

## [1.11.0]

- Added a cockatiel 🦜 as a new pet. Credit @marcduiker
- Added a white dog as an option.

## [1.10.0]

- The Squirrel button on the status bar is also a shortcut to add a pet. Credit @Harry-Hopkinson

## [1.9.3]

- Added a shortcut to open the pets window (a little squirrel) in the status bar. Credit @Harry-Hopkinson

## [1.9.2]

- Added "Bolt" as a new name
- Fixed animations for totoro after chasing the ball
- Fixed swipe animation holding for too long
- Fixed dog or cat color being set to anything other than brown or black not defaulting back to another color

## [1.9.1]

- Added Rocky (the rock) as a new pet. Credit @marcduiker

## [1.8.2]

- Fix animations

## [1.8.1]

- Pets will acquire better names. Credit @JING1201

## [1.8.0]

- Added Zappy <⚡> as a new pet. Credit @marcduiker

## [1.7.0]

- Updated the snake media 🐍. Credit @marcduiker
- Different types of pets move at more realistic speeds.

## [1.6.0]

- Pets will now become friends with other pets and chase after them when they're playing
- Pets will remember who their friends are using saved state
- Pets are assigned names and you're notified of new friendships
- [bugfix] fixed the ball chases for themes with a high floor, like the castle

## [1.5.0]

- Added a `castle` theme! The castle will light up when you switch from a light to dark theme too.

## [1.4.0]

- Added Totoro as a new pet. Credit to @robconery

## [1.3.0]

- Added Ferris the crab 🦀 as a new pet. Credit @marcduiker

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
