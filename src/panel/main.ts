// This script will be run within the webview itself
import { PetSize, PetColor, PetType } from '../common/types';
import {IState} from './states'; 
import {resolvePet} from './pets';

function calculateBallRadius(size: PetSize): number{
  if (size === PetSize.nano){
    return 2;
  } else if (size === PetSize.medium){
    return 4;
  } else if (size === PetSize.large){
    return 8;
  } else {
    return 1; // Shrug
  }
}

function calculateSpriteWidth(size: PetSize): number{
  if (size === PetSize.nano){
    return 30;
  } else if (size === PetSize.medium){
    return 55;
  } else if (size === PetSize.large){
    return 110;
  } else {
    return 30; // Shrug
  }
}

// It cannot access the main VS Code APIs directly.
export function petPanelApp(basePetUri: string, petColor: PetColor, petSize: PetSize, petType: PetType) {
  var petSpriteElement: HTMLImageElement = (document.getElementById("petSprite") as HTMLImageElement);
  var petRoot = basePetUri;
  var petBottom: number = 0;
  var pet = resolvePet(petType);
  const ballRadius: number = calculateBallRadius(petSize);

  /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
  var canvas : HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    cx: number = 100,
    cy: number = 100,
    vx: number = 2,
    vy: number = 5,
    gravity: number = 0.2,
    damping: number = 0.9,
    traction: number = 0.8,
    paused: boolean = false;

  function initSpriteScale() {
    petSpriteElement.style.width = "auto";
    petSpriteElement.style.height = "auto";
    petSpriteElement.style.maxWidth = `${calculateSpriteWidth(petSize)}px`;
    petSpriteElement.style.maxHeight = `${calculateSpriteWidth(petSize)}px`;
  }

  function initBallPhysics() {
    canvas = (document.getElementById("petCanvas") as HTMLCanvasElement);
    ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);
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
    if (!paused) {requestAnimationFrame(throwBall);}

    if (cx + ballRadius >= canvas.width) {
      vx = -vx * damping;
      cx = canvas.width - ballRadius;
    } else if (cx - ballRadius <= 0) {
      vx = -vx * damping;
      cx = ballRadius;
    }
    if (cy + ballRadius >= canvas.height) {
      vy = -vy * damping;
      cy = canvas.height - ballRadius;
      // traction here
      vx *= traction;
    } else if (cy - ballRadius <= 0) {
      vy = -vy * damping;
      cy = ballRadius;
    }

    vy += gravity;

    cx += vx;
    cy += vy;

    ctx.beginPath();
    ctx.arc(cx, cy, ballRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#2ed851";
    ctx.fill();
  }

  function faceLeft() {
    petSpriteElement.style.webkitTransform = "scaleX(-1)";
  }

  function faceRight() {
    petSpriteElement.style.webkitTransform = "scaleX(1)";
  }

  function faceUp() {
    petSpriteElement.style.webkitTransform = "rotate(0)";
  }

  function setAnimation(face: string) {
    if (petSpriteElement.src === petRoot + face) {
      return;
    }
    petSpriteElement.src = petRoot + face;
  }

  function handleMouseOver(e: any) {
    if (pet.currentState() === "swipe" || state === "chase") {
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
    petSpriteElement.addEventListener("mouseover", handleMouseOver);
    // TODO : init pet 
  }
  console.log('Starting pet session', petColor, basePetUri, petType);
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
};
