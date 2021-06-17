// CANVAS
let canvas = document.querySelector('canvas');
canvas.style.border = '2px solid black';
let ctx = canvas.getContext('2d');

// DOM
let startBtn = document.querySelector('#startButton');
let restartBtn1 = document.querySelector('#restartButton1');
let restartBtn2 = document.querySelector('#restartButton2');
let introSection = document.querySelector('#introScr');
let gamePlaySection = document.querySelector('#playGame');
let gameOverSection = document.querySelector('#gameOver');
let winningSection = document.querySelector('#winner');

// VARIABLES
let gameOver = false;
let hasWon = false;
let intervalId = null;
let incrX = 0;
let incrY = 1;
let speed = 40;
let numberOfAnimatesPerMove = 20;
let currentStep = 0;
const snakeWidth = 40;
const startingX = snakeWidth * 2;
const startingY = snakeWidth * 2;
const startingDirection = 'right';
let snakeX = startingX;
let snakeY = startingY;
let length = 1;
let tail = [{'x': snakeX, 'y': snakeY}];
let direction = startingDirection;
let score = 0;
let winScore = 10;
let haveParrot = false;
let parrotX = 0;
let parrotY = 0 ;


// IMAGES
let partyParrotImg = new Image();
partyParrotImg.src = 'images/party-parrot.gif';

let sadParrotImg = new Image();
sadParrotImg.src = 'images/sad-parrot.gif';

// MUSIC
let gameMusic = new Audio();
gameMusic.src = 'music/techno-loop.mp3';
gameMusic.volume = 0.2;
gameMusic.loop = true;

// FUNCTIONS
// Create the Conga of Parrots
function drawSnake() {
    tail.forEach( point => {
        ctx.drawImage(partyParrotImg, point.x, point.y, snakeWidth, snakeWidth);
    });
};

// Create the Lonely Parrot
function drawParrot() {
    if (haveParrot) {
        ctx.drawImage(sadParrotImg, parrotX, parrotY, snakeWidth, snakeWidth);
    };
};

// Display the Score
function showScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Work Sans';
    ctx.fillText(`Score: ${score}`, 10, 30);
};

// Move the Conga around the Canvas
function moveSnake() {
    if (direction == 'up') {
        incrX = 0;
        incrY = -1;
    };
    if (direction == 'down') {
        incrX = 0;
        incrY = 1;
    };
    if (direction == 'left') {
        incrX = -1;
        incrY = 0;
    };
    if (direction == 'right') {
        incrX = 1;
        incrY = 0;
    };
    if (currentStep % numberOfAnimatesPerMove == 0) {
        snakeX = snakeX + incrX * speed;
        snakeY = snakeY + incrY * speed;

        tail.push({'x': snakeX, 'y': snakeY});
        if (tail.length > length) {
            tail.shift();
        };
    };
    currentStep++;
};

// Detect Game Over Collisions
function collision() {
    // check if conga hits the borders
    if (snakeX + snakeWidth > canvas.width) {
        gameOver = true;
    };
    if (snakeX < 0) {
        gameOver = true;
    };
    if (snakeY + snakeWidth > canvas.height) {
        gameOver = true;
    };
    if (snakeY < 0) {
        gameOver = true;
    };
    // check if conga hits itself
    for (let i = 0; i < tail.length-1;i++) {
        if (snakeX == tail[i].x && snakeY == tail[i].y) {
            gameOver = true;
        };
    };
};

// Detect Collision between Conga Head + Parrot
function collectParrot() {
    if (!haveParrot) {
        // generate parrot
        parrotY = Math.floor(getRandomInt(canvas.height - snakeWidth)/snakeWidth)*snakeWidth;
        parrotX = Math.floor(getRandomInt(canvas.width - snakeWidth)/snakeWidth)*snakeWidth;
        haveParrot = true;
    } else {
        if (parrotX == snakeX && parrotY == snakeY) {
            score++;
            length++;
            haveParrot = false;
        };
    };
};

// Check Score against Win Condition
function checkWin() {
    if (score == winScore) {
        hasWon = true;
        gameOver = true;
    };
};

// The Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showScore();
    moveSnake();
    drawSnake();
    collision();
    collectParrot();
    checkWin();
    drawParrot();
    // checking for win/lose
    if (gameOver) {
        if (hasWon) {
            cancelAnimationFrame(intervalId);
            introSection.style.display = 'none';
            canvas.style.display = 'none';
            gameOverSection.style.display = 'none';
            winningSection.style.display = 'block';
            gameMusic.pause();
        } else {
            cancelAnimationFrame(intervalId);
            introSection.style.display = 'none';
            canvas.style.display = 'none';
            gameOverSection.style.display = 'block';
            winningSection.style.display = 'none';
            gameMusic.pause();
        };
    } else {
        intervalId = requestAnimationFrame(animate);
    };
};

// Start of the Game
function start() {
    introSection.style.display = 'none';
    canvas.style.display = 'block';
    gameOverSection.style.display = 'none';
    winningSection.style.display = 'none';
    animate();
    gameMusic.play();
};

// EVENT LISTENERS
window.addEventListener('load', () => {
    canvas.style.display = 'none';
    winningSection.style.display = 'none';
    gameOverSection.style.display = 'none';
    // Keyboard events
    document.addEventListener('keydown', (event) =>{
        if (event.code == 'ArrowRight' && direction != 'left') {
            direction = 'right';
        };
        if (event.code == 'ArrowLeft' && direction != 'right') {
            direction = 'left';
        };
        if (event.code == 'ArrowUp' && direction != "down") {
            direction = 'up';
        };
        if (event.code == 'ArrowDown' && direction != "up") {
            direction = 'down';
        };
    });
    // Mouse Events
    // Start Button
    startBtn.addEventListener('click', () => {
        start();
    });
    restartBtn1.addEventListener('click', () => {
        gameOver = false;
        snakeX = startingX;
        snakeY = startingY;
        direction = startingDirection;
        haveParrot = false;
        score = 0;
        length = 1;
        tail = [{'x': snakeX, 'y':snakeY}];
        start();
    });
    // Restart button
    restartBtn2.addEventListener('click', () => {
        gameOver = false;
        snakeX = startingX;
        snakeY = startingY;
        direction = startingDirection;
        haveParrot = false;
        score = 0;
        length = 1;
        tail = [{'x': snakeX, 'y':snakeY}];
        start();
    });
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};