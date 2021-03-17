// This script will be run within the webview itself
import { PetSize, PetColor, PetType } from '../common/types';
import {createPet} from './pets';
import { BallState } from './states';

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
  var pet = createPet(petType, petSpriteElement, basePetUri + '/' + petColor);
  const ballRadius: number = calculateBallRadius(petSize);

  /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
  var canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D;
  const gravity: number = 0.2, damping: number = 0.9, traction: number = 0.8;
  var ballState: BallState;

  function initSprite() {
    petSpriteElement.style.left = '0px';
    petSpriteElement.style.bottom = '0px';
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
    ballState = new BallState(100, 100, 2, 5);
  }

  function throwBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!ballState.paused) {requestAnimationFrame(throwBall);}

    if (ballState.cx + ballRadius >= canvas.width) {
      ballState.vx = -ballState.vx * damping;
      ballState.cx = canvas.width - ballRadius;
    } else if (ballState.cx - ballRadius <= 0) {
      ballState.vx = -ballState.vx * damping;
      ballState.cx = ballRadius;
    }
    if (ballState.cy + ballRadius >= canvas.height) {
      ballState.vy = -ballState.vy * damping;
      ballState.cy = canvas.height - ballRadius;
      // traction here
      ballState.vx *= traction;
    } else if (ballState.cy - ballRadius <= 0) {
      ballState.vy = -ballState.vy * damping;
      ballState.cy = ballRadius;
    }

    ballState.vy += gravity;

    ballState.cx += ballState.vx;
    ballState.cy += ballState.vy;

    ctx.beginPath();
    ctx.arc(ballState.cx, ballState.cy, ballRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#2ed851";
    ctx.fill();
  }

  function handleMouseOver(e: any) {
    if (!pet.canSwipe()) {
      return;
    }
    pet.swipe();
  }

  function startAnimations() {
    petSpriteElement.addEventListener("mouseover", handleMouseOver);
    setInterval(() => {
      pet.nextFrame();
    }, 100);
  }
  console.log('Starting pet session', petColor, basePetUri, petType);
  initSprite();
  startAnimations();
  initBallPhysics();

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case "throw-ball":
        resetBall();
        throwBall();
        pet.chase(ballState, canvas);
        break;
    }
  });
};
