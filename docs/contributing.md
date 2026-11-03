# Contributing

## Ideas and discussion

Have an awesome idea for a new feature? Please [open an issue](https://github.com/tonybaloney/vscode-pets/issues/new) describing your idea! You can also help by reviewing some of the [existing ideas](https://github.com/tonybaloney/vscode-pets/issues) and leaving your opinion.

## Reporting bugs

Something is not working as it should? Please [open an issue](https://github.com/tonybaloney/vscode-pets/issues/new) giving as much information as you can. Writing an effective bug report is a valuable skill as a Software Engineer, refer to the given example below for advice.

* Title - Clearly summarize what the bug is with specific details.  
* Summary - If the title is too long, include a summary with additional details.  
* Visual/Screenshot - A picture is always worth the time. Include one if possible.  
* Expected/Actual Results - Explain what you expected to happen and what actually happened.  
* Steps to Reproduce - The steps to follow should be comprehensive, easy to understand, and short. We want to experience the bug first-hand.  
* Environment - Share the current version information by copying from `Help` and clicking `About`.

## Write code

Want to contribute to vscode-pets? Feel free to [fork the repository](https://github.com/tonybaloney/vscode-pets/fork) and submit a pull request.

## Drawing and Animations

If you want to contribute improvements to the animations, additional pet colors or even new pets, clone the repository and work in the `media/` folder.  

Most drawings are done in [aseprite](https://www.aseprite.org/) because you can edit GIFs directly. However, you are free to use any tool to make the animations. Animations should be 8 frames per second. The style of the extension is to have pixelated creatures (although not limited to an 8-bit color canvas).  

Don't worry if you don't have enough coding experience to add the changes to the extension to support the new animations, we can help you with that.  

The minimum set of behaviors is:

* standing
* walking
* running/chasing
* holding green ball

### Regenerating Finley artwork

Finley's editable pixel palette, sprites, and animation frames are in `media/finley/pixel-art.json`. After installing the project's development dependencies and ImageMagick 7, run `npm run generate:finley` to regenerate the six `blue_*_8fps.gif` animations and `icon.png`.

The generator preserves the authored pixels and checks the GIF output against the source. Keep the ball green (`#2ed851`) to match the thrown ball in the pet panel.

## Testing the changes

* Run `npm install`.
* Run `npm run compile`.
* Go to the debug panel on the sidebar and launch the development version with the extension loaded (first option in the debug profiles).
* Refer to [VS Code Extension Documentation](https://code.visualstudio.com/api) for additional resources.

## Submitting a PR

* Please make sure to run `npm run lint` and verify there are no errors/warnings.
* You can run `npm run lint:fix` to fix the lint issues.
