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

### Packaging additional cat coats

`media/cat-colors.json` lists the 17 additional cat options and maps their runtime
color IDs to the approved offline animation review matrix. It keeps palette swaps
separate from new region-mask artwork. The six existing cat color IDs and their
assets are unchanged: in particular, legacy `white` remains the tuxedo cat, while
`solid white` is the all-white option. Existing black and tuxedo artwork supply
two of the 19 representative coats; the archive adds the other 17.

With Python 3.10 or later, package the approved HTML matrix without installing
additional dependencies:

```shell
python scripts/package-cat-colors.py path-to-approved-review.html
```

The output is `.build-out/cat-colors.zip`, containing 170 GIFs, 17 matching 32x32
icons, and a manifest recording source groups, frame timing, repeat behavior, and
SHA-256 hashes. Entries are rooted at `cat/` for extraction inside `media/`.
No original assets are overwritten. Fall-from-wall and land must play once;
the other eight animations must repeat indefinitely. The packager rejects
incomplete matrices, mismatched metadata, and incorrect repeat behavior.

Keep the approved review HTML, loose GIFs, and loose icons out of Git. The HTML
embeds artwork and is an asset, not source code. Commit only the protected bundle
as `media/cat-colors.zip`.

The standard-library packager creates an unencrypted ZIP; protect its contents
using the same password and ZIP encryption format as `media/extra.zip` before
replacing the committed bundle. Do not put the password in source or
documentation. Release CI extracts the new archive after the existing assets
using the `EXTRA_ASSETS` secret.

Run the packager's tests with:

```shell
python -m unittest discover -s scripts/tests -p "test_cat_colors.py"
```

## Testing the changes

* Run `npm install`.
* Run `npm run compile`.
* Go to the debug panel on the sidebar and launch the development version with the extension loaded (first option in the debug profiles).
* Refer to [VS Code Extension Documentation](https://code.visualstudio.com/api) for additional resources.

## Submitting a PR

* Please make sure to run `npm run lint` and verify there are no errors/warnings.
* You can run `npm run lint:fix` to fix the lint issues.
