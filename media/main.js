// This script will be run within the webview itself

// It cannot access the main VS Code APIs directly.
(function () {
  var state = "idle"; // idle, walking-right, walking-left, climbing right
  var prevState = "";
  var pet = document.getElementsByClassName("pet")[0];
  var petRoot = basePetUri;
  var petAffix = petColor;
  var idleCounter = 0,
    swipeCounter = 0,
    idleBallCounter = 0;
  var petLeft = 0;
  var petBottom = 0;

  /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
  var canvas,
    ctx,
    cx = 100,
    cy = 100,
    vx = 2,
    vy = 5,
    radius = 2,
    gravity = 0.2,
    damping = 0.9,
    traction = 0.8,
    paused = false;

  function initBallPhysics() {
    canvas = document.getElementById("petCanvas");
    ctx = canvas.getContext("2d");
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
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
    if (!paused) requestAnimationFrame(throwBall);

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
    petLeft += 1;
    pet.style.left = `${petLeft}px`;
    if (petLeft >= window.innerWidth - 30) {
      return true;
    }
  }

  function stepLeft() {
    faceLeft();
    setAnimation("/" + petAffix + "_walk_fast_8fps.gif");
    petLeft -= 2;
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
    } else {
      faceRight();
      petLeft += 3;
    }

    pet.style.left = `${petLeft}px`;
    if (canvas.height - cy < 30 && cx < petLeft && petLeft < cx + 15) {
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
    if (petType === "cat") {
      setInterval(() => {
        catSequence();
      }, 100);
    } else if (petType === "dog") {
      setInterval(() => {
        dogSequence();
      }, 100);
    }
  }

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
})();
