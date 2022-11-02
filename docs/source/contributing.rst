Contributing
------------

Ideas and discussion
++++++++++++++++++++

Have an awesome idea for a new feature? Please `open an issue <https://github.com/tonybaloney/vscode-pets/issues/new>`_ describing your idea! You can also help by reviewing some of the `existing ideas <https://github.com/tonybaloney/vscode-pets/issues>`_ and leaving your opinion.

Reporting bugs
++++++++++++++

Something is not working as it should? Please `open an issue <https://github.com/tonybaloney/vscode-pets/issues/new>`_ giving as much information as you can. Writing an effective bug report is a valuable skill as a Software Engineer, refer to the given example below for advice.

**Title** - Clearly summarize what the bug is with specific details.  
**Summary** - If the title is too long, include a summary with additional details.  
**Visual/Screenshot** - A picture is always worth the time. Include one if possible.  
**Expected/Actual Results** - Explain what you expected to happen and what actually happened.  
**Steps to Reproduce** - The steps to follow should be comprehensive, easy to understand, and short. We want to experience the bug first-hand.  
**Environment** - Share the current version information by copying from `Help` and clicking `About`.


   Version: 1.72.0  
   Commit: 64bbfbf67ada9953918d72e1df2f4d8e537d340e  
   Date: 2022-10-04T23:20:47.539Z
   Electron: 19.0.17
   Chromium: 102.0.5005.167
   Node.js: 16.14.2
   V8: 10.2.154.15-electron.0
   OS: Linux x64 5.19.12-200.fc36.x86_64
   Sandboxed: No

Write code
++++++++++

Want to contribute to vscode-pets? Feel free to `fork the repository <https://github.com/tonybaloney/vscode-pets/fork>`_ and submit a pull request.

Drawing and Animations
++++++++++++++++++++++

If you want to contribute improvements to the animations, additional pet colors or even new pets, clone the repository and work in the `media/` folder.  

Most drawings are done in `aseprite <https://www.aseprite.org/>`_ because you can edit GIFs directly. However, you are free to use any tool to make the animations. Animations should be 8 frames per second. The style of the extension is to have pixelated creatures (although not limited to an 8-bit color canvas).  

Don't worry if you don't have enough coding experience to add the changes to the extension to support the new animations, we can help you with that.  

The minimum set of behaviors is:

* standing
* walking
* running/chasing
* holding green ball

Testing the changes  
+++++++++++++++++++

-   Run `npm install`.
-   Run `npm run compile`.
-   Go to the debug panel on the sidebar and launch the development version with the extension loaded (first option in the debug profiles).
-   Refer to `VS Code Extension Documentation <https://code.visualstudio.com/api>`_ for additional resources.
