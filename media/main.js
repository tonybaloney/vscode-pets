// This script will be run within the webview itself

// It cannot access the main VS Code APIs directly.
(function () {
    var state = 'idle'; // idle, walking-right, walking-left, climbing right
    var pet = document.getElementsByClassName("pet")[0];
    var petRoot = basePetUri;
    var petAffix = petColor;
    var idleCounter = 0;
    var petLeft = 0;
    var petBottom = 0;

    function faceLeft(){
        pet.style.webkitTransform = "scaleX(-1)";
    }

    function faceRight(){
        pet.style.webkitTransform = "scaleX(1)";
    }

    function faceDown(){
        pet.style.webkitTransform = "rotate(180)";
    }

    function faceUp(){
        pet.style.webkitTransform = "rotate(0)";
    }


    function setAnimation(face, repeat=true){
        if (pet.src === petRoot + face){
            return;
        }
        pet.src = petRoot + face;
    }

    function sitIdle(){
        faceLeft(); faceUp();
        setAnimation('/'+petAffix+'_idle_blink_8fps.gif');
        idleCounter++;
        if (idleCounter > 50) { // Sit for 5 seconds
            idleCounter = 0;
            return true ;
        }
    }

    function wallHangLeft(){
        setAnimation('/'+petAffix+'_wallgrab_8fps.gif');
        idleCounter++;
        if (idleCounter > 50) { // Sit for 5 seconds
            idleCounter = 0;
            return true ;
        }
    }

    function land(){
        setAnimation('/'+petAffix+'_land_8fps.gif');
        idleCounter++;
        if (idleCounter > 10) { // Sit for 1 second
            idleCounter = 0;
            return true ;
        }
    }

    function stepRight(){
        faceRight();
        setAnimation('/'+petAffix+'_sneak_8fps.gif');
        petLeft += 1;
        pet.style.left = `${petLeft}px`;
        if (petLeft >= (window.innerWidth - 30))
        {
            return true;
        }
    }

    function stepLeft(){
        faceLeft();
        setAnimation('/'+petAffix+'_run_12fps.gif');
        petLeft -= 2;
        pet.style.left = `${petLeft}px`;
        if (petLeft <= 0)
        {
            return true;
        }
    }

    function climbUpLeft(){
        faceLeft();
        setAnimation('/'+petAffix+'_wallclimb_8fps.gif');
        petBottom += 1;
        pet.style.bottom = `${petBottom}px`;
        if (petBottom >= 100)
        {
            return true;
        }
    }

    function climbDownLeft(){
        faceRight();
        setAnimation('/'+petAffix+'_fall_from_grab_8fps.gif', false);
        petBottom -= 5;
        pet.style.bottom = `${petBottom}px`;
        if (petBottom <= 0)
        {
            petBottom = 0;
            return true;
        }
    }

    function nextPosition(){
        if (state === 'idle'){
            if (sitIdle()) {
                state = 'walking-right';
            }
        } else if (state === 'walking-right'){
            if (stepRight()){
                state = 'walking-left';
            }
        } else if (state === 'walking-left'){
            if (stepLeft()){
                state = 'climbing-up-left';
            }
        } else if (state === 'climbing-up-left'){
            if (climbUpLeft()){
                state = 'wall-hang-left';
            }
        } else if (state === 'wall-hang-left'){
            if (wallHangLeft()){
                state = 'climbing-down-left';
            }
        } else if (state === 'climbing-down-left'){
            if (climbDownLeft()){
                state = 'landing';
            }
        } else if (state === 'landing'){
            if (land()){
                state = 'idle';
            }
        }
    }
    function startAnimations(){
        setInterval(() => {
            nextPosition();
        }, 100);
    }

    console.log("Using path " + petRoot);
    startAnimations();

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {

        }
    });

}());