"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petPanelApp = exports.saveState = exports.allPets = void 0;
// This script will be run within the webview itself
const names_1 = require("../common/names");
const pets_1 = require("./pets");
const states_1 = require("./states");
const bar_1 = require("./bar");
const codeLine_1 = require("../common/codeLine");
exports.allPets = new pets_1.PetCollection();
var petCounter;
function calculateBallRadius(size) {
    if (size === "nano" /* PetSize.nano */) {
        return 2;
    }
    else if (size === "small" /* PetSize.small */) {
        return 3;
    }
    else if (size === "medium" /* PetSize.medium */) {
        return 4;
    }
    else if (size === "large" /* PetSize.large */) {
        return 8;
    }
    else {
        return 1; // Shrug
    }
}
function calculateFloor(size, theme) {
    switch (theme) {
        case "forest" /* Theme.forest */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 30;
                case "medium" /* PetSize.medium */:
                    return 40;
                case "large" /* PetSize.large */:
                    return 65;
                case "nano" /* PetSize.nano */:
                default:
                    return 23;
            }
        case "castle" /* Theme.castle */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 60;
                case "medium" /* PetSize.medium */:
                    return 80;
                case "large" /* PetSize.large */:
                    return 120;
                case "nano" /* PetSize.nano */:
                default:
                    return 45;
            }
        case "beach" /* Theme.beach */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 60;
                case "medium" /* PetSize.medium */:
                    return 80;
                case "large" /* PetSize.large */:
                    return 120;
                case "nano" /* PetSize.nano */:
                default:
                    return 45;
            }
    }
    return 0;
}
function handleMouseOver(e) {
    var el = e.currentTarget;
    exports.allPets.pets.forEach((element) => {
        if (element.collision === el) {
            if (!element.pet.canSwipe) {
                return;
            }
            element.pet.swipe();
            (0, bar_1.showBar)(element.pet.name, element.getLevel(), element.getExperience(), element.getNextTarget(), element.getHealth());
        }
    });
}
function handleMouseLeave() {
    (0, bar_1.hideBar)();
}
// TO DO: Add click
function startAnimations(collision, pet, stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    collision.addEventListener('mouseover', handleMouseOver);
    collision.addEventListener('mouseleave', handleMouseLeave);
    setInterval(() => {
        var updates = exports.allPets.seekNewFriends();
        updates.forEach((message) => {
            stateApi?.postMessage({
                text: message,
                command: 'info',
            });
        });
        pet.nextFrame();
        saveState(stateApi);
    }, 100);
    setInterval(codeLine_1.updateCount, 100000);
}
function addPetToPanel(petType, basePetUri, petColor, petSize, left, bottom, floor, name, stateApi) {
    var petSpriteElement = document.createElement('img');
    petSpriteElement.className = 'pet';
    document.getElementById('petsContainer').appendChild(petSpriteElement);
    var collisionElement = document.createElement('div');
    collisionElement.className = 'collision';
    document.getElementById('petsContainer').appendChild(collisionElement);
    var speechBubbleElement = document.createElement('div');
    speechBubbleElement.className = `bubble bubble-${petSize}`;
    speechBubbleElement.innerText = 'Hello!';
    document.getElementById('petsContainer').appendChild(speechBubbleElement);
    const root = basePetUri + '/' + petType + '/' + petColor;
    console.log('Creating new pet : ', petType, root, petColor, petSize, name);
    try {
        if (!(0, pets_1.availableColors)(petType).includes(petColor)) {
            throw new pets_1.InvalidPetException('Invalid color for pet type');
        }
        var newPet = (0, pets_1.createPet)(petType, petSpriteElement, collisionElement, speechBubbleElement, petSize, left, bottom, root, floor, name);
        petCounter++;
        startAnimations(collisionElement, newPet, stateApi);
    }
    catch (e) {
        // Remove elements
        petSpriteElement.remove();
        collisionElement.remove();
        speechBubbleElement.remove();
        throw e;
    }
    const petEm = new pets_1.PetElement(petSpriteElement, collisionElement, speechBubbleElement, newPet, petColor, petType);
    return petEm;
}
function saveState(stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    var state = new states_1.PetPanelState();
    state.petStates = new Array();
    exports.allPets.pets.forEach((petItem) => {
        state.petStates?.push({
            petName: petItem.pet.name,
            petColor: petItem.color,
            petType: petItem.type,
            petState: petItem.pet.getState(),
            petFriend: petItem.pet.friend?.name ?? undefined,
            elLeft: petItem.el.style.left,
            elBottom: petItem.el.style.bottom,
        });
    });
    state.petCounter = petCounter;
    stateApi?.setState(state);
}
exports.saveState = saveState;
function recoverState(basePetUri, petSize, floor, stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    var state = stateApi?.getState();
    if (!state) {
        petCounter = 1;
    }
    else {
        if (state.petCounter === undefined || isNaN(state.petCounter)) {
            petCounter = 1;
        }
        else {
            petCounter = state.petCounter ?? 1;
        }
    }
    var recoveryMap = new Map();
    state?.petStates?.forEach((p) => {
        // Fixes a bug related to duck animations
        if (p.petType === 'rubber duck') {
            p.petType = 'rubber-duck';
        }
        try {
            var newPet = addPetToPanel(p.petType ?? "cat" /* PetType.cat */, basePetUri, p.petColor ?? "brown" /* PetColor.brown */, petSize, parseInt(p.elLeft ?? '0'), parseInt(p.elBottom ?? '0'), floor, p.petName ?? (0, names_1.randomName)(p.petType ?? "cat" /* PetType.cat */), stateApi);
            exports.allPets.push(newPet);
            recoveryMap.set(newPet.pet, p);
        }
        catch (InvalidPetException) {
            console.log('State had invalid pet (' + p.petType + '), discarding.');
        }
    });
    recoveryMap.forEach((state, pet) => {
        // Recover previous state.
        if (state.petState !== undefined) {
            pet.recoverState(state.petState);
        }
        // Resolve friend relationships
        var friend = undefined;
        if (state.petFriend) {
            friend = exports.allPets.locate(state.petFriend);
            if (friend) {
                pet.recoverFriend(friend.pet);
            }
        }
    });
}
function randomStartPosition() {
    return Math.floor(Math.random() * (window.innerWidth * 0.7));
}
let canvas, ctx;
function initCanvas() {
    canvas = document.getElementById('petCanvas');
    if (!canvas) {
        console.log('Canvas not ready');
        return;
    }
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log('Canvas context not ready');
        return;
    }
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, theme, themeKind, petColor, petSize, petType, throwBallWithMouse, stateApi) {
    const ballRadius = calculateBallRadius(petSize);
    var floor = 0;
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    // Apply Theme backgrounds
    const foregroundEl = document.getElementById('foreground');
    if (theme !== "none" /* Theme.none */) {
        var _themeKind = '';
        switch (themeKind) {
            case 2 /* ColorThemeKind.dark */:
                _themeKind = 'dark';
                break;
            case 1 /* ColorThemeKind.light */:
                _themeKind = 'light';
                break;
            case 3 /* ColorThemeKind.highContrast */:
            default:
                _themeKind = 'light';
                break;
        }
        document.body.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/background-${_themeKind}-${petSize}.png')`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        foregroundEl.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/foreground-${_themeKind}-${petSize}.png')`;
        floor = calculateFloor(petSize, theme); // Themes have pets at a specified height from the ground
    }
    else {
        document.body.style.backgroundImage = '';
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        foregroundEl.style.backgroundImage = '';
    }
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    const gravity = 0.6, damping = 0.9, traction = 0.8, interval = 1000 / 24; // msec for single frame
    let then = 0; // last draw
    var ballState;
    function resetBall() {
        if (ballState) {
            ballState.paused = true;
        }
        if (canvas) {
            canvas.style.display = 'block';
        }
        ballState = new states_1.BallState(100, 100, 4, 5);
    }
    function dynamicThrowOn() {
        let startMouseX;
        let startMouseY;
        let endMouseX;
        let endMouseY;
        console.log('Enabling dynamic throw');
        window.onmousedown = (e) => {
            if (ballState) {
                ballState.paused = true;
            }
            if (canvas) {
                canvas.style.display = 'block';
            }
            endMouseX = e.clientX;
            endMouseY = e.clientY;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            ballState = new states_1.BallState(e.clientX, e.clientY, 0, 0);
            exports.allPets.pets.forEach((petEl) => {
                if (petEl.pet.canChase) {
                    petEl.pet.chase(ballState, canvas);
                }
            });
            ballState.paused = true;
            drawBall();
            window.onmousemove = (ev) => {
                ev.preventDefault();
                if (ballState) {
                    ballState.paused = true;
                }
                startMouseX = endMouseX;
                startMouseY = endMouseY;
                endMouseX = ev.clientX;
                endMouseY = ev.clientY;
                ballState = new states_1.BallState(ev.clientX, ev.clientY, 0, 0);
                drawBall();
            };
            window.onmouseup = (ev) => {
                ev.preventDefault();
                window.onmouseup = null;
                window.onmousemove = null;
                ballState = new states_1.BallState(endMouseX, endMouseY, endMouseX - startMouseX, endMouseY - startMouseY);
                exports.allPets.pets.forEach((petEl) => {
                    if (petEl.pet.canChase) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                throwBall();
            };
        };
    }
    function dynamicThrowOff() {
        console.log('Disabling dynamic throw');
        window.onmousedown = null;
        if (ballState) {
            ballState.paused = true;
        }
        if (canvas) {
            canvas.style.display = 'none';
        }
    }
    function throwBall() {
        if (!ballState.paused) {
            requestAnimationFrame(throwBall);
        }
        // throttling the frame rate
        const now = Date.now();
        const elapsed = now - then;
        if (elapsed <= interval) {
            return;
        }
        then = now - (elapsed % interval);
        if (ballState.cx + ballRadius >= canvas.width) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = canvas.width - ballRadius;
        }
        else if (ballState.cx - ballRadius <= 0) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = ballRadius;
        }
        if (ballState.cy + ballRadius + floor >= canvas.height) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = canvas.height - ballRadius - floor;
            // traction here
            ballState.vx *= traction;
        }
        else if (ballState.cy - ballRadius <= 0) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = ballRadius;
        }
        ballState.vy += gravity;
        ballState.cx += ballState.vx;
        ballState.cy += ballState.vy;
        drawBall();
    }
    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(ballState.cx, ballState.cy, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#2ed851';
        ctx.fill();
    }
    console.log('Starting pet session', petColor, basePetUri, petType, throwBallWithMouse);
    // New session
    var state = stateApi?.getState();
    if (!state) {
        console.log('No state, starting a new session.');
        petCounter = 1;
        exports.allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), floor, floor, (0, names_1.randomName)(petType), stateApi));
        saveState(stateApi);
    }
    else {
        console.log('Recovering state - ', state);
        recoverState(basePetUri, petSize, floor, stateApi);
    }
    initCanvas();
    if (throwBallWithMouse) {
        dynamicThrowOn();
    }
    else {
        dynamicThrowOff();
    }
    // Handle messages sent from the extension to the webview
    window.addEventListener('message', (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'throw-with-mouse':
                if (message.enabled) {
                    dynamicThrowOn();
                }
                else {
                    dynamicThrowOff();
                }
                break;
            case 'throw-ball':
                resetBall();
                throwBall();
                exports.allPets.pets.forEach((petEl) => {
                    if (petEl.pet.canChase) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                break;
            case 'spawn-pet':
                exports.allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), floor, floor, message.name ?? (0, names_1.randomName)(message.type), stateApi));
                saveState(stateApi);
                break;
            case 'list-pets':
                var pets = exports.allPets.pets;
                stateApi?.postMessage({
                    command: 'list-pets',
                    text: pets
                        .map((pet) => `${pet.type},${pet.pet.name},${pet.color}`)
                        .join('\n'),
                });
                break;
            case 'roll-call':
                var pets = exports.allPets.pets;
                // go through every single
                // pet and then print out their name
                pets.forEach((pet) => {
                    stateApi?.postMessage({
                        command: 'info',
                        text: `${pet.pet.emoji} ${pet.pet.name} (${pet.color} ${pet.type}): ${pet.pet.hello}`,
                    });
                });
            case 'delete-pet':
                var pet = exports.allPets.locate(message.name);
                if (pet) {
                    exports.allPets.remove(message.name);
                    saveState(stateApi);
                    stateApi?.postMessage({
                        command: 'info',
                        text: '👋 Removed pet ' + message.name,
                    });
                }
                else {
                    stateApi?.postMessage({
                        command: 'error',
                        text: `Could not find pet ${message.name}`,
                    });
                }
                break;
            case 'reset-pet':
                exports.allPets.reset();
                petCounter = 0;
                saveState(stateApi);
                break;
            case 'pause-pet':
                petCounter = 1;
                saveState(stateApi);
                break;
        }
    });
}
exports.petPanelApp = petPanelApp;
window.addEventListener('resize', function () {
    initCanvas();
});
//# sourceMappingURL=main.js.map