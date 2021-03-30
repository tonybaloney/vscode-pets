// This script will be run within the webview itself
import { PetSize, PetColor, PetType } from '../common/types';
import {createPet, IPetType} from './pets';
import { BallState, PetPanelState } from './states';

/* This is how the VS Code API can be invoked from the panel */
declare global {
  interface VscodeStateApi { 
    getState() : PetPanelState; // API is actually Any, but we want it to be typed.
    setState(state: PetPanelState): void;
  }
  interface Window {
    acquireVsCodeApi(): VscodeStateApi;
  }
}

const vscode = window.acquireVsCodeApi();

class PetElement {
  el: HTMLImageElement;
  pet: IPetType;
  color: PetColor;
  type: PetType;

  constructor(el: HTMLImageElement, pet: IPetType, color: PetColor, type: PetType){
    this.el = el;
    this.pet = pet;
    this.color = color;
    this.type = type;
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

function initSprite(el: HTMLImageElement, petSize: PetSize, left: string, bottom: string) {
  el.style.left = left;
  el.style.bottom = bottom;
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
    saveState();
  }, 100);
}

function addPetToPanel(petType: PetType, basePetUri: string, petColor: PetColor, petSize: PetSize, left: string, bottom: string): PetElement {
  var petSpriteElement: HTMLImageElement = document.createElement("img");
  petSpriteElement.className = "pet";
  (document.getElementById("petsContainer") as HTMLDivElement).appendChild(petSpriteElement);
  const root = basePetUri + '/' + petType + '/' + petColor;
  console.log("Creating new pet : ", petType, root);
  var newPet = createPet(petType, petSpriteElement, root);
  initSprite(petSpriteElement, petSize, left, bottom);
  startAnimations(petSpriteElement, newPet);
  return new PetElement(petSpriteElement, newPet, petColor, petType);
}

function saveState(){
  var state = new PetPanelState();
  state.petStates = new Array();

  allPets.forEach(petItem => {
    state.petStates!.push({
      petColor: petItem.color,
      petType: petItem.type,
      petState: petItem.pet.getState(),
      elLeft: petItem.el.style.left,
      elBottom: petItem.el.style.bottom
    });
  });
  vscode.setState(state);
}

function recoverState(basePetUri: string, petSize: PetSize){
  var state = vscode.getState();
  state.petStates!.forEach(p => {
    var newPet = addPetToPanel(p.petType!, basePetUri, p.petColor!, petSize, p.elLeft!, p.elBottom!);
    newPet.pet.recoverState(p.petState!);
    allPets.push(newPet);
  });
}

function randomStartPosition() : string {
  const x: number = Math.floor(Math.random() * (window.innerWidth * 0.7));
  return `${x}px`;
}

// It cannot access the main VS Code APIs directly.
export function petPanelApp(basePetUri: string, petColor: PetColor, petSize: PetSize, petType: PetType) {
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
  // New session
  var state = vscode.getState();
  if (!state) {
    console.log('No state, starting a new session.');
    allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), '0px'));
    saveState();
  } else { 
    console.log('Recovering state - ', state);
    recoverState(basePetUri, petSize);
  }

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
        allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), '0px'));
        saveState();
        break;
      case "reset-pet":
        allPets.forEach(pet => pet.el.remove());
        allPets = [];
        allPets.push(addPetToPanel(message.type, basePetUri, message.color, message.size, randomStartPosition(), '0px'));
        saveState();
        break;
    }
  });
};
