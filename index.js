// CANVAS
let canvas = document.getElementById("gameCanvas")
let ctx = canvas.getContext("2d")
let width = 500; // think about how can I not hard code this?
let height = 500; // as i've already defined this in the html file
let cellWidth = 10;
let conga = [];
let direction = "right"";
let score = 0;
let gameOver = false;

// STATES
let startScreen = document.querySelector("startScreenContainer");
let gameOverScreen = document.querySelector("gameOverContainer");
let winScreen = document.querySelector("winScreenContainer")

// BUTTONS
let startButton = document.getElementById("start")
let restartButton = document.getElementById("restart")

// IMAGES
let parrot = new Image();
parrot.src = "images/parrot.gif";


// FUNCTIONS
function startGame() {
    gameCanvas.style.display="block";
    createConga();
    createParrot();
}

startGame();

// create the conga
function createConga () {
    let length = 3;
    congaArray = [];
    for (let i = length-1; 0 >= 0; i--) 
    congaArray.push({x: 1, yx:0})
}


// create the lonely parrot
function createParrot() {
    randomLocation = {
        x: Math.round(Math.random() * (width - 2 ) / cw),
        y: Math.round(Math.random() * (height - 20) / cw)
    }
}

function moveConga() {};
function drawParrot() {};
function detectCollision() {};
function clearBoard() {};
function getScore() {};
function endGame() {;}

// KEYBOARD EVENTS - PRESS
document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
        isArrowUp = false;
        isArrowDown = false;
    }
    else if (event.key == "ArrowRight") {
        isRightArrow = true;
        isLeftArrow = false;
        isArrowUp = false;
        isArrowDown = false;
    }
    else if (event.key == "ArrowUp") {
        isRightArrow = false;
        isLeftArrow = false;
        isArrowUp = true;
        isArrowDown = false;
    }
    else if (event.key == "ArrowDonw") {
        isRightArrow = false;
        isLeftArrow = false;
        isArrowUp = false;
        isArrowDown = true;
    }
});
// KEYBOARD EVENTS - RELEASE
document.addEventListener("Keyup", (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isArrowUp = false;
    isArrowDown =false;
});

// MOUSE EVENTS
startButton.addEventListener('click', () => {
    startGame()
})

restartButton.addEventListener('click', () => {
    gameOver = false;
    score = 0;
    startGame()
})