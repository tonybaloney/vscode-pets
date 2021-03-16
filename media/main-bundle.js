/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/panel/main.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.petPanelApp = void 0;
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, petColor, scaleSize, petType) {
    var state = "idle"; // idle, walking-right, walking-left, climbing right
    var prevState = "";
    var pet = document.getElementsByClassName("pet")[0];
    var petRoot = basePetUri;
    var petAffix = petColor;
    var idleCounter = 0, swipeCounter = 0, idleBallCounter = 0;
    var petLeft = 0;
    var petBottom = 0;
    if (scaleSize === "nano" /* nano */) {
        var spriteWidth = 30, radius = 2;
    }
    else if (scaleSize === "medium" /* medium */) {
        var spriteWidth = 55, radius = 4;
    }
    else if (scaleSize === "large" /* large */) {
        var spriteWidth = 110, radius = 8;
    }
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    var canvas, ctx, cx = 100, cy = 100, vx = 2, vy = 5, gravity = 0.2, damping = 0.9, traction = 0.8, paused = false;
    function initSpriteScale() {
        pet.style.width = "auto";
        pet.style.height = "auto";
        pet.style.maxWidth = `${spriteWidth}px`;
        pet.style.maxHeight = `${spriteWidth}px`;
    }
    function initBallPhysics() {
        canvas = document.getElementById("petCanvas");
        ctx = canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    function resetBall() {
        canvas.style.display = "block";
        paused = false;
        cx = 100;
        cy = 100;
        vx = 2;
        vy = 5;
    }
    function throwBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!paused) {
            requestAnimationFrame(throwBall);
        }
        if (cx + radius >= canvas.width) {
            vx = -vx * damping;
            cx = canvas.width - radius;
        }
        else if (cx - radius <= 0) {
            vx = -vx * damping;
            cx = radius;
        }
        if (cy + radius >= canvas.height) {
            vy = -vy * damping;
            cy = canvas.height - radius;
            // traction here
            vx *= traction;
        }
        else if (cy - radius <= 0) {
            vy = -vy * damping;
            cy = radius;
        }
        vy += gravity;
        cx += vx;
        cy += vy;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#2ed851";
        ctx.fill();
    }
    function faceLeft() {
        pet.style.webkitTransform = "scaleX(-1)";
    }
    function faceRight() {
        pet.style.webkitTransform = "scaleX(1)";
    }
    function faceUp() {
        pet.style.webkitTransform = "rotate(0)";
    }
    function setAnimation(face) {
        if (pet.src === petRoot + face) {
            return;
        }
        pet.src = petRoot + face;
    }
    function sitIdle() {
        faceLeft();
        faceUp();
        setAnimation("/" + petAffix + "_idle_8fps.gif");
        idleCounter++;
        if (idleCounter > 50 + Math.floor(Math.random() * 100)) {
            // Sit for 5-15 seconds
            idleCounter = 0;
            return true;
        }
    }
    function lie() {
        faceLeft();
        faceUp();
        setAnimation("/" + petAffix + "_lie_8fps.gif");
        idleCounter++;
        if (idleCounter > 50 + Math.floor(Math.random() * 100)) {
            // Sit for 5 seconds
            idleCounter = 0;
            return true;
        }
    }
    function wallHangLeft() {
        setAnimation("/" + petAffix + "_wallgrab_8fps.gif");
        idleCounter++;
        if (idleCounter > 50) {
            // Sit for 5 seconds
            idleCounter = 0;
            return true;
        }
    }
    function land() {
        setAnimation("/" + petAffix + "_land_8fps.gif");
        idleCounter++;
        if (idleCounter > 10) {
            // Sit for 1 second
            idleCounter = 0;
            return true;
        }
    }
    function swipe() {
        setAnimation("/" + petAffix + "_swipe_8fps.gif");
        swipeCounter++;
        if (swipeCounter > 10) {
            // Sit for 1 second
            swipeCounter = 0;
            return true;
        }
    }
    function idleBall() {
        setAnimation("/" + petAffix + "_with_ball_8fps.gif");
        idleBallCounter++;
        if (idleBallCounter > 30) {
            idleBallCounter = 0;
            return true;
        }
    }
    function stepRight() {
        faceRight();
        setAnimation("/" + petAffix + "_walk_8fps.gif");
        petLeft += 3;
        pet.style.left = `${petLeft}px`;
        if (petLeft >= window.innerWidth - spriteWidth) {
            return true;
        }
    }
    function stepLeft() {
        faceLeft();
        setAnimation("/" + petAffix + "_walk_fast_8fps.gif");
        petLeft -= 5;
        pet.style.left = `${petLeft}px`;
        if (petLeft <= 0) {
            return true;
        }
    }
    function chase() {
        setAnimation("/" + petAffix + "_run_8fps.gif");
        if (petLeft > cx) {
            faceLeft();
            petLeft -= 3;
        }
        else {
            faceRight();
            petLeft += 3;
        }
        pet.style.left = `${petLeft}px`;
        if (canvas.height - cy < spriteWidth && cx < petLeft && petLeft < cx + 15) {
            // hide ball
            canvas.style.display = "none";
            paused = true;
            return true;
        }
    }
    function climbUpLeft() {
        faceLeft();
        setAnimation("/" + petAffix + "_wallclimb_8fps.gif");
        petBottom += 1;
        pet.style.bottom = `${petBottom}px`;
        if (petBottom >= 100) {
            return true;
        }
    }
    function climbDownLeft() {
        faceRight();
        setAnimation("/" + petAffix + "_fall_from_grab_8fps.gif");
        petBottom -= 5;
        pet.style.bottom = `${petBottom}px`;
        if (petBottom <= 0) {
            petBottom = 0;
            return true;
        }
    }
    function catSequence() {
        if (state === "idle") {
            if (sitIdle()) {
                state = "walking-right";
            }
        }
        else if (state === "walking-right") {
            if (stepRight()) {
                state = "walking-left";
            }
        }
        else if (state === "walking-left") {
            if (stepLeft()) {
                state = "climbing-up-left";
            }
        }
        else if (state === "climbing-up-left") {
            if (climbUpLeft()) {
                state = "wall-hang-left";
            }
        }
        else if (state === "wall-hang-left") {
            if (wallHangLeft()) {
                state = "climbing-down-left";
            }
        }
        else if (state === "climbing-down-left") {
            if (climbDownLeft()) {
                state = "landing";
            }
        }
        else if (state === "landing") {
            if (land()) {
                state = "idle";
            }
        }
        else if (state === "swipe") {
            if (swipe()) {
                state = prevState;
            }
        }
        else if (state === "chase") {
            if (chase()) {
                state = "idle-ball";
            }
        }
        else if (state === "idle-ball") {
            if (idleBall()) {
                state = prevState;
            }
        }
    }
    function dogSequence() {
        if (state === "idle") {
            if (sitIdle()) {
                state = "walking-right";
            }
        }
        else if (state === "walking-right") {
            if (stepRight()) {
                state = "walking-left";
            }
        }
        else if (state === "walking-left") {
            if (stepLeft()) {
                state = "lie";
            }
        }
        else if (state === "lie") {
            if (lie()) {
                state = "idle";
            }
        }
        else if (state === "swipe") {
            if (swipe()) {
                state = prevState;
            }
        }
        else if (state === "chase") {
            if (chase()) {
                state = "idle-ball";
            }
        }
        else if (state === "idle-ball") {
            if (idleBall()) {
                state = prevState;
            }
        }
    }
    function snakeSequence() {
        if (state === "idle") {
            if (sitIdle()) {
                state = "walking-right";
            }
        }
        else if (state === "walking-right") {
            if (stepRight()) {
                state = "walking-left";
            }
        }
        else if (state === "walking-left") {
            if (stepLeft()) {
                state = "idle";
            }
        }
        else if (state === "swipe") {
            if (swipe()) {
                state = prevState;
            }
        }
        else if (state === "chase") {
            if (chase()) {
                state = "idle-ball";
            }
        }
        else if (state === "idle-ball") {
            if (idleBall()) {
                state = prevState;
            }
        }
    }
    function clippySequence() {
        if (state === "idle") {
            if (sitIdle()) {
                state = "walking-right";
            }
        }
        else if (state === "walking-right") {
            if (stepRight()) {
                state = "walking-left";
            }
        }
        else if (state === "walking-left") {
            if (stepLeft()) {
                state = "idle";
            }
        }
        else if (state === "swipe") {
            if (swipe()) {
                state = prevState;
            }
        }
        else if (state === "chase") {
            if (chase()) {
                state = "idle-ball";
            }
        }
        else if (state === "idle-ball") {
            if (idleBall()) {
                state = prevState;
            }
        }
    }
    function handleMouseOver(e) {
        if (state === "swipe" || state === "chase") {
            return;
        }
        if (petBottom !== 0) {
            // don't swipe when on wall/falling.
            return;
        }
        prevState = state;
        state = "swipe";
    }
    function startAnimations() {
        pet.addEventListener("mouseover", handleMouseOver);
        if (petType === "cat" /* cat */) {
            setInterval(() => {
                catSequence();
            }, 100);
        }
        else if (petType === "dog" /* dog */) {
            setInterval(() => {
                dogSequence();
            }, 100);
        }
        else if (petType === "snake" /* snake */) {
            setInterval(() => {
                snakeSequence();
            }, 100);
        }
        else if (petType === "clippy" /* clippy */) {
            setInterval(() => {
                clippySequence();
            }, 100);
        }
    }
    console.log('Starting pet session');
    initSpriteScale();
    startAnimations();
    initBallPhysics();
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case "throw-ball":
                resetBall();
                throwBall();
                prevState = state;
                state = "chase";
                break;
        }
    });
}
exports.petPanelApp = petPanelApp;
;

})();

self.petApp = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxtREFBbUQ7QUFDbkQsU0FBZ0IsV0FBVyxDQUFDLFVBQWtCLEVBQUUsUUFBa0IsRUFBRSxTQUFrQixFQUFFLE9BQWdCO0lBQ3RHLElBQUksS0FBSyxHQUFXLE1BQU0sQ0FBQyxDQUFDLG9EQUFvRDtJQUNoRixJQUFJLFNBQVMsR0FBVyxFQUFFLENBQUM7SUFDM0IsSUFBSSxHQUFHLEdBQXNCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQXdDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUcsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUN4QixJQUFJLFdBQVcsR0FBVyxDQUFDLEVBQ3pCLFlBQVksR0FBVyxDQUFDLEVBQ3hCLGVBQWUsR0FBVyxDQUFDLENBQUM7SUFDOUIsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztJQUUxQixJQUFJLFNBQVMsc0JBQWlCLEVBQUM7UUFDN0IsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLFNBQVMsMEJBQW1CLEVBQUM7UUFDdEMsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLFNBQVMsd0JBQWtCLEVBQUM7UUFDckMsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbkM7SUFFRCx5RUFBeUU7SUFDekUsSUFBSSxNQUEwQixFQUM1QixHQUE2QixFQUM3QixFQUFFLEdBQVcsR0FBRyxFQUNoQixFQUFFLEdBQVcsR0FBRyxFQUNoQixFQUFFLEdBQVcsQ0FBQyxFQUNkLEVBQUUsR0FBVyxDQUFDLEVBQ2Qs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LENBQUM7WUFDaEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7YUFBTSxJQUFJLE9BQU8sb0JBQWdCLEVBQUU7WUFDbEMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDZixXQUFXLEVBQUUsQ0FBQztZQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDthQUFNLElBQUksT0FBTyx3QkFBa0IsRUFBRTtZQUNwQyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNmLGFBQWEsRUFBRSxDQUFDO1lBQ2xCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNUO2FBQU0sSUFBSSxPQUFPLDBCQUFtQixFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7SUFDSCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3BDLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGVBQWUsRUFBRSxDQUFDO0lBRWxCLHlEQUF5RDtJQUN6RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLHdDQUF3QztRQUNwRSxRQUFRLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDdkIsS0FBSyxZQUFZO2dCQUNmLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ2hCLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFaRCxrQ0EwWkM7QUFBQSxDQUFDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBzY3JpcHQgd2lsbCBiZSBydW4gd2l0aGluIHRoZSB3ZWJ2aWV3IGl0c2VsZlxuaW1wb3J0IHsgUGV0U2l6ZSwgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuIFxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXG5leHBvcnQgZnVuY3Rpb24gcGV0UGFuZWxBcHAoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHNjYWxlU2l6ZTogUGV0U2l6ZSwgcGV0VHlwZTogUGV0VHlwZSkge1xuICB2YXIgc3RhdGU6IHN0cmluZyA9IFwiaWRsZVwiOyAvLyBpZGxlLCB3YWxraW5nLXJpZ2h0LCB3YWxraW5nLWxlZnQsIGNsaW1iaW5nIHJpZ2h0XG4gIHZhciBwcmV2U3RhdGU6IHN0cmluZyA9IFwiXCI7XG4gIHZhciBwZXQ6IEhUTUxJbWFnZUVsZW1lbnQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBldFwiKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxJbWFnZUVsZW1lbnQ+KVswXTtcbiAgdmFyIHBldFJvb3QgPSBiYXNlUGV0VXJpO1xuICB2YXIgcGV0QWZmaXggPSBwZXRDb2xvcjtcbiAgdmFyIGlkbGVDb3VudGVyOiBudW1iZXIgPSAwLFxuICAgIHN3aXBlQ291bnRlcjogbnVtYmVyID0gMCxcbiAgICBpZGxlQmFsbENvdW50ZXI6IG51bWJlciA9IDA7XG4gIHZhciBwZXRMZWZ0OiBudW1iZXIgPSAwO1xuICB2YXIgcGV0Qm90dG9tOiBudW1iZXIgPSAwO1xuICBcbiAgaWYgKHNjYWxlU2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcbiAgICB2YXIgc3ByaXRlV2lkdGggPSAzMCwgcmFkaXVzID0gMjtcbiAgfSBlbHNlIGlmIChzY2FsZVNpemUgPT09IFBldFNpemUubWVkaXVtKXtcbiAgICB2YXIgc3ByaXRlV2lkdGggPSA1NSwgcmFkaXVzID0gNDtcbiAgfSBlbHNlIGlmIChzY2FsZVNpemUgPT09IFBldFNpemUubGFyZ2Upe1xuICAgIHZhciBzcHJpdGVXaWR0aCA9IDExMCwgcmFkaXVzID0gODtcbiAgfVxuXG4gIC8vLyBCb3VuY2luZyBiYWxsIGNvbXBvbmVudHMsIGNyZWRpdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjk5ODIzNDNcbiAgdmFyIGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIGN4OiBudW1iZXIgPSAxMDAsXG4gICAgY3k6IG51bWJlciA9IDEwMCxcbiAgICB2eDogbnVtYmVyID0gMixcbiAgICB2eTogbnVtYmVyID0gNSxcbiAgICBncmF2aXR5OiBudW1iZXIgPSAwLjIsXG4gICAgZGFtcGluZzogbnVtYmVyID0gMC45LFxuICAgIHRyYWN0aW9uOiBudW1iZXIgPSAwLjgsXG4gICAgcGF1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaW5pdFNwcml0ZVNjYWxlKCkge1xuICAgIHBldC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgIHBldC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICBwZXQuc3R5bGUubWF4V2lkdGggPSBgJHtzcHJpdGVXaWR0aH1weGA7XG4gICAgcGV0LnN0eWxlLm1heEhlaWdodCA9IGAke3Nwcml0ZVdpZHRofXB4YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRCYWxsUGh5c2ljcygpIHtcbiAgICBjYW52YXMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICAgIGN0eCA9IChjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRCYWxsKCkge1xuICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIGN4ID0gMTAwO1xuICAgIGN5ID0gMTAwO1xuICAgIHZ4ID0gMjtcbiAgICB2eSA9IDU7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0JhbGwoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGlmICghcGF1c2VkKSB7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRocm93QmFsbCk7fVxuXG4gICAgaWYgKGN4ICsgcmFkaXVzID49IGNhbnZhcy53aWR0aCkge1xuICAgICAgdnggPSAtdnggKiBkYW1waW5nO1xuICAgICAgY3ggPSBjYW52YXMud2lkdGggLSByYWRpdXM7XG4gICAgfSBlbHNlIGlmIChjeCAtIHJhZGl1cyA8PSAwKSB7XG4gICAgICB2eCA9IC12eCAqIGRhbXBpbmc7XG4gICAgICBjeCA9IHJhZGl1cztcbiAgICB9XG4gICAgaWYgKGN5ICsgcmFkaXVzID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIHZ5ID0gLXZ5ICogZGFtcGluZztcbiAgICAgIGN5ID0gY2FudmFzLmhlaWdodCAtIHJhZGl1cztcbiAgICAgIC8vIHRyYWN0aW9uIGhlcmVcbiAgICAgIHZ4ICo9IHRyYWN0aW9uO1xuICAgIH0gZWxzZSBpZiAoY3kgLSByYWRpdXMgPD0gMCkge1xuICAgICAgdnkgPSAtdnkgKiBkYW1waW5nO1xuICAgICAgY3kgPSByYWRpdXM7XG4gICAgfVxuXG4gICAgdnkgKz0gZ3Jhdml0eTtcblxuICAgIGN4ICs9IHZ4O1xuICAgIGN5ICs9IHZ5O1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY3gsIGN5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJlZDg1MVwiO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBmdW5jdGlvbiBmYWNlTGVmdCgpIHtcbiAgICBwZXQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoLTEpXCI7XG4gIH1cblxuICBmdW5jdGlvbiBmYWNlUmlnaHQoKSB7XG4gICAgcGV0LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKDEpXCI7XG4gIH1cblxuICBmdW5jdGlvbiBmYWNlVXAoKSB7XG4gICAgcGV0LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwicm90YXRlKDApXCI7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmltYXRpb24oZmFjZTogc3RyaW5nKSB7XG4gICAgaWYgKHBldC5zcmMgPT09IHBldFJvb3QgKyBmYWNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBldC5zcmMgPSBwZXRSb290ICsgZmFjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNpdElkbGUoKSB7XG4gICAgZmFjZUxlZnQoKTtcbiAgICBmYWNlVXAoKTtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX2lkbGVfOGZwcy5naWZcIik7XG4gICAgaWRsZUNvdW50ZXIrKztcbiAgICBpZiAoaWRsZUNvdW50ZXIgPiA1MCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpIHtcbiAgICAgIC8vIFNpdCBmb3IgNS0xNSBzZWNvbmRzXG4gICAgICBpZGxlQ291bnRlciA9IDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaWUoKSB7XG4gICAgZmFjZUxlZnQoKTtcbiAgICBmYWNlVXAoKTtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX2xpZV84ZnBzLmdpZlwiKTtcbiAgICBpZGxlQ291bnRlcisrO1xuICAgIGlmIChpZGxlQ291bnRlciA+IDUwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSkge1xuICAgICAgLy8gU2l0IGZvciA1IHNlY29uZHNcbiAgICAgIGlkbGVDb3VudGVyID0gMDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdhbGxIYW5nTGVmdCgpIHtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX3dhbGxncmFiXzhmcHMuZ2lmXCIpO1xuICAgIGlkbGVDb3VudGVyKys7XG4gICAgaWYgKGlkbGVDb3VudGVyID4gNTApIHtcbiAgICAgIC8vIFNpdCBmb3IgNSBzZWNvbmRzXG4gICAgICBpZGxlQ291bnRlciA9IDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsYW5kKCkge1xuICAgIHNldEFuaW1hdGlvbihcIi9cIiArIHBldEFmZml4ICsgXCJfbGFuZF84ZnBzLmdpZlwiKTtcbiAgICBpZGxlQ291bnRlcisrO1xuICAgIGlmIChpZGxlQ291bnRlciA+IDEwKSB7XG4gICAgICAvLyBTaXQgZm9yIDEgc2Vjb25kXG4gICAgICBpZGxlQ291bnRlciA9IDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzd2lwZSgpIHtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX3N3aXBlXzhmcHMuZ2lmXCIpO1xuICAgIHN3aXBlQ291bnRlcisrO1xuICAgIGlmIChzd2lwZUNvdW50ZXIgPiAxMCkge1xuICAgICAgLy8gU2l0IGZvciAxIHNlY29uZFxuICAgICAgc3dpcGVDb3VudGVyID0gMDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlkbGVCYWxsKCkge1xuICAgIHNldEFuaW1hdGlvbihcIi9cIiArIHBldEFmZml4ICsgXCJfd2l0aF9iYWxsXzhmcHMuZ2lmXCIpO1xuICAgIGlkbGVCYWxsQ291bnRlcisrO1xuICAgIGlmIChpZGxlQmFsbENvdW50ZXIgPiAzMCkge1xuICAgICAgaWRsZUJhbGxDb3VudGVyID0gMDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0ZXBSaWdodCgpIHtcbiAgICBmYWNlUmlnaHQoKTtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX3dhbGtfOGZwcy5naWZcIik7XG4gICAgcGV0TGVmdCArPSAzO1xuICAgIHBldC5zdHlsZS5sZWZ0ID0gYCR7cGV0TGVmdH1weGA7XG4gICAgaWYgKHBldExlZnQgPj0gd2luZG93LmlubmVyV2lkdGggLSBzcHJpdGVXaWR0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RlcExlZnQoKSB7XG4gICAgZmFjZUxlZnQoKTtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX3dhbGtfZmFzdF84ZnBzLmdpZlwiKTtcbiAgICBwZXRMZWZ0IC09IDU7XG4gICAgcGV0LnN0eWxlLmxlZnQgPSBgJHtwZXRMZWZ0fXB4YDtcbiAgICBpZiAocGV0TGVmdCA8PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGFzZSgpIHtcbiAgICBzZXRBbmltYXRpb24oXCIvXCIgKyBwZXRBZmZpeCArIFwiX3J1bl84ZnBzLmdpZlwiKTtcbiAgICBpZiAocGV0TGVmdCA+IGN4KSB7XG4gICAgICBmYWNlTGVmdCgpO1xuICAgICAgcGV0TGVmdCAtPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWNlUmlnaHQoKTtcbiAgICAgIHBldExlZnQgKz0gMztcbiAgICB9XG5cbiAgICBwZXQuc3R5bGUubGVmdCA9IGAke3BldExlZnR9cHhgO1xuICAgIGlmIChjYW52YXMuaGVpZ2h0IC0gY3kgPCBzcHJpdGVXaWR0aCAmJiBjeCA8IHBldExlZnQgJiYgcGV0TGVmdCA8IGN4ICsgMTUpIHtcbiAgICAgIC8vIGhpZGUgYmFsbFxuICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGltYlVwTGVmdCgpIHtcbiAgICBmYWNlTGVmdCgpO1xuICAgIHNldEFuaW1hdGlvbihcIi9cIiArIHBldEFmZml4ICsgXCJfd2FsbGNsaW1iXzhmcHMuZ2lmXCIpO1xuICAgIHBldEJvdHRvbSArPSAxO1xuICAgIHBldC5zdHlsZS5ib3R0b20gPSBgJHtwZXRCb3R0b219cHhgO1xuICAgIGlmIChwZXRCb3R0b20gPj0gMTAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGltYkRvd25MZWZ0KCkge1xuICAgIGZhY2VSaWdodCgpO1xuICAgIHNldEFuaW1hdGlvbihcIi9cIiArIHBldEFmZml4ICsgXCJfZmFsbF9mcm9tX2dyYWJfOGZwcy5naWZcIik7XG4gICAgcGV0Qm90dG9tIC09IDU7XG4gICAgcGV0LnN0eWxlLmJvdHRvbSA9IGAke3BldEJvdHRvbX1weGA7XG4gICAgaWYgKHBldEJvdHRvbSA8PSAwKSB7XG4gICAgICBwZXRCb3R0b20gPSAwO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2F0U2VxdWVuY2UoKSB7XG4gICAgaWYgKHN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgaWYgKHNpdElkbGUoKSkge1xuICAgICAgICBzdGF0ZSA9IFwid2Fsa2luZy1yaWdodFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwid2Fsa2luZy1yaWdodFwiKSB7XG4gICAgICBpZiAoc3RlcFJpZ2h0KCkpIHtcbiAgICAgICAgc3RhdGUgPSBcIndhbGtpbmctbGVmdFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwid2Fsa2luZy1sZWZ0XCIpIHtcbiAgICAgIGlmIChzdGVwTGVmdCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJjbGltYmluZy11cC1sZWZ0XCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJjbGltYmluZy11cC1sZWZ0XCIpIHtcbiAgICAgIGlmIChjbGltYlVwTGVmdCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJ3YWxsLWhhbmctbGVmdFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwid2FsbC1oYW5nLWxlZnRcIikge1xuICAgICAgaWYgKHdhbGxIYW5nTGVmdCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJjbGltYmluZy1kb3duLWxlZnRcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcImNsaW1iaW5nLWRvd24tbGVmdFwiKSB7XG4gICAgICBpZiAoY2xpbWJEb3duTGVmdCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJsYW5kaW5nXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJsYW5kaW5nXCIpIHtcbiAgICAgIGlmIChsYW5kKCkpIHtcbiAgICAgICAgc3RhdGUgPSBcImlkbGVcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcInN3aXBlXCIpIHtcbiAgICAgIGlmIChzd2lwZSgpKSB7XG4gICAgICAgIHN0YXRlID0gcHJldlN0YXRlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiY2hhc2VcIikge1xuICAgICAgaWYgKGNoYXNlKCkpIHtcbiAgICAgICAgc3RhdGUgPSBcImlkbGUtYmFsbFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiaWRsZS1iYWxsXCIpIHtcbiAgICAgIGlmIChpZGxlQmFsbCgpKSB7XG4gICAgICAgIHN0YXRlID0gcHJldlN0YXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRvZ1NlcXVlbmNlKCkge1xuICAgIGlmIChzdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgIGlmIChzaXRJZGxlKCkpIHtcbiAgICAgICAgc3RhdGUgPSBcIndhbGtpbmctcmlnaHRcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIndhbGtpbmctcmlnaHRcIikge1xuICAgICAgaWYgKHN0ZXBSaWdodCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJ3YWxraW5nLWxlZnRcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIndhbGtpbmctbGVmdFwiKSB7XG4gICAgICBpZiAoc3RlcExlZnQoKSkge1xuICAgICAgICBzdGF0ZSA9IFwibGllXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJsaWVcIikge1xuICAgICAgaWYgKGxpZSgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJpZGxlXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJzd2lwZVwiKSB7XG4gICAgICBpZiAoc3dpcGUoKSkge1xuICAgICAgICBzdGF0ZSA9IHByZXZTdGF0ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcImNoYXNlXCIpIHtcbiAgICAgIGlmIChjaGFzZSgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJpZGxlLWJhbGxcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcImlkbGUtYmFsbFwiKSB7XG4gICAgICBpZiAoaWRsZUJhbGwoKSkge1xuICAgICAgICBzdGF0ZSA9IHByZXZTdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzbmFrZVNlcXVlbmNlKCkge1xuICAgIGlmIChzdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgIGlmIChzaXRJZGxlKCkpIHtcbiAgICAgICAgc3RhdGUgPSBcIndhbGtpbmctcmlnaHRcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIndhbGtpbmctcmlnaHRcIikge1xuICAgICAgaWYgKHN0ZXBSaWdodCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJ3YWxraW5nLWxlZnRcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIndhbGtpbmctbGVmdFwiKSB7XG4gICAgICBpZiAoc3RlcExlZnQoKSkge1xuICAgICAgICBzdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwic3dpcGVcIikge1xuICAgICAgaWYgKHN3aXBlKCkpIHtcbiAgICAgICAgc3RhdGUgPSBwcmV2U3RhdGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJjaGFzZVwiKSB7XG4gICAgICBpZiAoY2hhc2UoKSkge1xuICAgICAgICBzdGF0ZSA9IFwiaWRsZS1iYWxsXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJpZGxlLWJhbGxcIikge1xuICAgICAgaWYgKGlkbGVCYWxsKCkpIHtcbiAgICAgICAgc3RhdGUgPSBwcmV2U3RhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xpcHB5U2VxdWVuY2UoKSB7XG4gICAgaWYgKHN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgaWYgKHNpdElkbGUoKSkge1xuICAgICAgICBzdGF0ZSA9IFwid2Fsa2luZy1yaWdodFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwid2Fsa2luZy1yaWdodFwiKSB7XG4gICAgICBpZiAoc3RlcFJpZ2h0KCkpIHtcbiAgICAgICAgc3RhdGUgPSBcIndhbGtpbmctbGVmdFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwid2Fsa2luZy1sZWZ0XCIpIHtcbiAgICAgIGlmIChzdGVwTGVmdCgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJpZGxlXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJzd2lwZVwiKSB7XG4gICAgICBpZiAoc3dpcGUoKSkge1xuICAgICAgICBzdGF0ZSA9IHByZXZTdGF0ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcImNoYXNlXCIpIHtcbiAgICAgIGlmIChjaGFzZSgpKSB7XG4gICAgICAgIHN0YXRlID0gXCJpZGxlLWJhbGxcIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcImlkbGUtYmFsbFwiKSB7XG4gICAgICBpZiAoaWRsZUJhbGwoKSkge1xuICAgICAgICBzdGF0ZSA9IHByZXZTdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU92ZXIoZTogYW55KSB7XG4gICAgaWYgKHN0YXRlID09PSBcInN3aXBlXCIgfHwgc3RhdGUgPT09IFwiY2hhc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGV0Qm90dG9tICE9PSAwKSB7XG4gICAgICAvLyBkb24ndCBzd2lwZSB3aGVuIG9uIHdhbGwvZmFsbGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJldlN0YXRlID0gc3RhdGU7XG4gICAgc3RhdGUgPSBcInN3aXBlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEFuaW1hdGlvbnMoKSB7XG4gICAgcGV0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKTtcbiAgICBpZiAocGV0VHlwZSA9PT0gUGV0VHlwZS5jYXQpIHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY2F0U2VxdWVuY2UoKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfSBlbHNlIGlmIChwZXRUeXBlID09PSBQZXRUeXBlLmRvZykge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBkb2dTZXF1ZW5jZSgpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9IGVsc2UgaWYgKHBldFR5cGUgPT09IFBldFR5cGUuc25ha2UpIHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc25ha2VTZXF1ZW5jZSgpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9IGVsc2UgaWYgKHBldFR5cGUgPT09IFBldFR5cGUuY2xpcHB5KSB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNsaXBweVNlcXVlbmNlKCk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnU3RhcnRpbmcgcGV0IHNlc3Npb24nKTtcbiAgaW5pdFNwcml0ZVNjYWxlKCk7XG4gIHN0YXJ0QW5pbWF0aW9ucygpO1xuICBpbml0QmFsbFBoeXNpY3MoKTtcblxuICAvLyBIYW5kbGUgbWVzc2FnZXMgc2VudCBmcm9tIHRoZSBleHRlbnNpb24gdG8gdGhlIHdlYnZpZXdcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgXCJ0aHJvdy1iYWxsXCI6XG4gICAgICAgIHJlc2V0QmFsbCgpO1xuICAgICAgICB0aHJvd0JhbGwoKTtcbiAgICAgICAgcHJldlN0YXRlID0gc3RhdGU7XG4gICAgICAgIHN0YXRlID0gXCJjaGFzZVwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=