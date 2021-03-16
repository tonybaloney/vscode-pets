// This script will be run within the webview itself
import { PetSize, PetColor, PetType } from '../common/types';
 
// It cannot access the main VS Code APIs directly.
export function petPanelApp(basePetUri: string, petColor: PetColor, scaleSize: PetSize, petType: PetType) {
  var state: string = "idle"; // idle, walking-right, walking-left, climbing right
  var prevState: string = "";
  var petSpriteElement: HTMLImageElement = (document.getElementById("petSprite") as HTMLImageElement);
  var petRoot = basePetUri;
  var petAffix = petColor;
  var idleCounter: number = 0,
    swipeCounter: number = 0,
    idleBallCounter: number = 0;
  var petLeft: number = 0;
  var petBottom: number = 0;
  
  if (scaleSize === PetSize.nano){
    var spriteWidth = 30, radius = 2;
  } else if (scaleSize === PetSize.medium){
    var spriteWidth = 55, radius = 4;
  } else if (scaleSize === PetSize.large){
    var spriteWidth = 110, radius = 8;
  }

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
    petSpriteElement.style.maxWidth = `${spriteWidth}px`;
    petSpriteElement.style.maxHeight = `${spriteWidth}px`;
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

    if (cx + radius >= canvas.width) {
      vx = -vx * damping;
      cx = canvas.width - radius;
    } else if (cx - radius <= 0) {
      vx = -vx * damping;
      cx = radius;
    }
    if (cy + radius >= canvas.height) {
      vy = -vy * damping;
      cy = canvas.height - radius;
      // traction here
      vx *= traction;
    } else if (cy - radius <= 0) {
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
    petSpriteElement.style.left = `${petLeft}px`;
    if (petLeft >= window.innerWidth - spriteWidth) {
      return true;
    }
  }

  function stepLeft() {
    faceLeft();
    setAnimation("/" + petAffix + "_walk_fast_8fps.gif");
    petLeft -= 5;
    petSpriteElement.style.left = `${petLeft}px`;
    if (petLeft <= 0) {
      return true;
    }
  }

  function chase() {
    setAnimation("/" + petAffix + "_run_8fps.gif");
    if (petLeft > cx) {
      faceLeft();
      petLeft -= 3;
    } else {
      faceRight();
      petLeft += 3;
    }

    petSpriteElement.style.left = `${petLeft}px`;
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
    petSpriteElement.style.bottom = `${petBottom}px`;
    if (petBottom >= 100) {
      return true;
    }
  }

  function climbDownLeft() {
    faceRight();
    setAnimation("/" + petAffix + "_fall_from_grab_8fps.gif");
    petBottom -= 5;
    petSpriteElement.style.bottom = `${petBottom}px`;
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
    } else if (state === "walking-right") {
      if (stepRight()) {
        state = "walking-left";
      }
    } else if (state === "walking-left") {
      if (stepLeft()) {
        state = "climbing-up-left";
      }
    } else if (state === "climbing-up-left") {
      if (climbUpLeft()) {
        state = "wall-hang-left";
      }
    } else if (state === "wall-hang-left") {
      if (wallHangLeft()) {
        state = "climbing-down-left";
      }
    } else if (state === "climbing-down-left") {
      if (climbDownLeft()) {
        state = "landing";
      }
    } else if (state === "landing") {
      if (land()) {
        state = "idle";
      }
    } else if (state === "swipe") {
      if (swipe()) {
        state = prevState;
      }
    } else if (state === "chase") {
      if (chase()) {
        state = "idle-ball";
      }
    } else if (state === "idle-ball") {
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
    } else if (state === "walking-right") {
      if (stepRight()) {
        state = "walking-left";
      }
    } else if (state === "walking-left") {
      if (stepLeft()) {
        state = "lie";
      }
    } else if (state === "lie") {
      if (lie()) {
        state = "idle";
      }
    } else if (state === "swipe") {
      if (swipe()) {
        state = prevState;
      }
    } else if (state === "chase") {
      if (chase()) {
        state = "idle-ball";
      }
    } else if (state === "idle-ball") {
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
    } else if (state === "walking-right") {
      if (stepRight()) {
        state = "walking-left";
      }
    } else if (state === "walking-left") {
      if (stepLeft()) {
        state = "idle";
      }
    } else if (state === "swipe") {
      if (swipe()) {
        state = prevState;
      }
    } else if (state === "chase") {
      if (chase()) {
        state = "idle-ball";
      }
    } else if (state === "idle-ball") {
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
    } else if (state === "walking-right") {
      if (stepRight()) {
        state = "walking-left";
      }
    } else if (state === "walking-left") {
      if (stepLeft()) {
        state = "idle";
      }
    } else if (state === "swipe") {
      if (swipe()) {
        state = prevState;
      }
    } else if (state === "chase") {
      if (chase()) {
        state = "idle-ball";
      }
    } else if (state === "idle-ball") {
      if (idleBall()) {
        state = prevState;
      }
    }
  }

  function handleMouseOver(e: any) {
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
    petSpriteElement.addEventListener("mouseover", handleMouseOver);
    if (petType === PetType.cat) {
      setInterval(() => {
        catSequence();
      }, 100);
    } else if (petType === PetType.dog) {
      setInterval(() => {
        dogSequence();
      }, 100);
    } else if (petType === PetType.snake) {
      setInterval(() => {
        snakeSequence();
      }, 100);
    } else if (petType === PetType.clippy) {
      setInterval(() => {
        clippySequence();
      }, 100);
    }
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
