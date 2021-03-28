// This script will be run within the webview itself
import { PetSize, PetColor, PetType } from '../common/types';
import {createPet, IPetType} from './pets';
import { BallState } from './states';

/* This is how the VS Code API can be invoked from the panel */
declare global {
  interface Window {
    acquireVsCodeApi(): any;
  }
}

const vscode = window.acquireVsCodeApi();

class PetElement {
  el: HTMLImageElement;
  pet: IPetType;

  constructor(el: HTMLImageElement, pet: IPetType){
    this.el = el;
    this.pet = pet;
  }
}

var allPets: Array<PetElement> = new Array(0);

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

function initSprite(el: HTMLImageElement, petSize: PetSize) {
  el.style.left = '0px';
  el.style.bottom = '0px';
  el.style.width = "auto";
  el.style.height = "auto";
  el.style.maxWidth = `${calculateSpriteWidth(petSize)}px`;
  el.style.maxHeight = `${calculateSpriteWidth(petSize)}px`;
}

function handleMouseOver(e: MouseEvent){
  var el = e.currentTarget as HTMLImageElement;
  allPets.forEach(element => {
    if (element.el === el){
      if (!element.pet.canSwipe()) {
        return;
      }
      element.pet.swipe();
    }
  });
  
}

function startAnimations(el: HTMLImageElement, pet: IPetType) {
  el.addEventListener("mouseover", handleMouseOver);
  setInterval(() => {
    pet.nextFrame();
  }, 100);
}

function addPetToPanel(petType: PetType, basePetUri: string, petColor: PetColor, petSize: PetSize): PetElement {
  var petSpriteElement: HTMLImageElement = document.createElement("img");
  petSpriteElement.className = "pet";
  (document.getElementById("petsContainer") as HTMLDivElement).appendChild(petSpriteElement);
  const root = basePetUri + '/' + petType + '/' + petColor;
  console.log("Creating new pet : ", petType, root);
  var newPet = createPet(petType, petSpriteElement, root);
  initSprite(petSpriteElement, petSize);
  startAnimations(petSpriteElement, newPet);
  return new PetElement(petSpriteElement, newPet);
}

// It cannot access the main VS Code APIs directly.
export function petPanelApp(basePetUri: string, petColor: PetColor, petSize: PetSize, petType: PetType) {
  allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize));
  const ballRadius: number = calculateBallRadius(petSize);

  /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
  var canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D;
  const gravity: number = 0.2, damping: number = 0.9, traction: number = 0.8;
  var ballState: BallState;

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

  console.log('Starting pet session', petColor, basePetUri, petType);

  initBallPhysics();

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case "throw-ball":
        resetBall();
        throwBall();
        allPets.forEach(petEl => {
          petEl.pet.chase(ballState, canvas);
        });
        break;
      case "spawn-pet":
        allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize));
        break;
    }
  });
};
