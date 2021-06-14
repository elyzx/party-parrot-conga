// CANVAS
let canvas = document.getElementById("gameCanvas")
let ctx = gameBoard.getContext("2d")

// STATES
let startScreen = document.querySelector("startScreenContainer");
let gameOverScreen = document.querySelector("gameOverContainer");
let winScreen = document.querySelector("winScreenContainer")

// BUTTONS
let startButton = document.querySelector("#start")
let restartButton = document.querySelector("#restart")

// IMAGES
let parrot = new Image();
parrot.src = "images/parrot.gif";

// VARIABLES 
let score = 0;
let gameOver = false;
let conga = []; 

// FUNCTIONS
function startGame() {
    startScreen.style.display="none";
    canvas.style.display="block"
}
function drawConga ()
function moveConga()
function drawParrot()
function detectCollision()
function clearBoard()
function getScore()
function endGame()

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