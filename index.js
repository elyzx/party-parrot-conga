// Canvas
let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"
let ctx = canvas.getContext('2d')

// Buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')

// Variables
let gameOver = false;
let intervalId = null
let incrX = 0;
let incrY = 1;
let speed = 20;
let numberOfAnimatesPerMove = 10;
let currentStep = 0;

const startingX = 100
const startingY = 80
const startingDirection = "right"
const snakeWidth = 20
let snakeX = startingX
let snakeY = startingY
let length = 1
let tail = [{"x": snakeX, "y": snakeY}]
let direction = startingDirection
let score = 0
let winScore = 10
let haveParrot = false
let parrotX = 0
let parrotY = 0 

// Functions

function drawSnake() {
    tail.forEach( point => {
        ctx.beginPath()
        ctx.fillStyle = '#4af0bb'
        ctx.rect(point.x, point.y, snakeWidth-1, snakeWidth-1);
        ctx.fill()
        ctx.closePath()
    })
}

function drawParrot() {
    if (haveParrot) {
        ctx.beginPath()
        ctx.fillStyle = '#f0bb4a'
        ctx.rect(parrotX, parrotY, snakeWidth, snakeWidth);
        ctx.fill()
        ctx.closePath()
    }
}

function moveSnake() {
    if (direction == 'up') {
        incrX = 0
        incrY = -1
    }
    if (direction == 'down') {
        incrX = 0
        incrY = 1
    }
    if (direction == 'left') {
        incrX = -1
        incrY = 0
    }
    if (direction == 'right') {
        incrX = 1
        incrY = 0
    }

    if (currentStep % numberOfAnimatesPerMove == 0) {
        snakeX = snakeX + incrX * speed
        snakeY = snakeY + incrY * speed

        tail.push({"x": snakeX, "y": snakeY})
        if (tail.length > length) {
            tail.shift()
        }
    }
    currentStep++;
}

function collision() {
    // check if conga hits the borders
    // there's a bug somewhere for the right and bottom borders
    if (snakeX + snakeWidth >= canvas.width) {
        gameOver = true
    }
    if (snakeX < 0) {
        gameOver = true
    }

    if (snakeY + snakeWidth >= canvas.height) {
        gameOver = true
    }
    if (snakeY < 0) {
        gameOver = true
    }
    
    // check if conga hits itself
    for (let i = 0; i < tail.length-1;i++) {
        if (snakeX == tail[i].x && snakeY == tail[i].y) {
            gameOver = true
            console.log("hit itself:", snakeX, "/", snakeY)
            console.log("tail:", tail)
        }
    }
}

function showScore() {
    ctx.fillStyle = 'white'
    ctx.font = '22px Verdana'
    ctx.fillText(`Score: ${score}`, 30, 30)
}

function collectParrot() {
    if (!haveParrot) {
        // generate parrot
        parrotY = Math.floor(getRandomInt(canvas.height - snakeWidth)/snakeWidth)*snakeWidth
        parrotX = Math.floor(getRandomInt(canvas.width - snakeWidth)/snakeWidth)*snakeWidth
        haveParrot = true
    } else {
        if (parrotX == snakeX && parrotY == snakeY) {
            score++
            length++
            haveParrot = false
        }
    }
}

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Track_the_score_and_win
function checkWin() {
    if (score == winScore) {
        alert("You Win!");
        document.location.reload();
        clearInterval(interval);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    showScore()
    moveSnake()
    drawSnake()
    collision()
    collectParrot()
    checkWin()
    drawParrot()

    if (gameOver) {
        cancelAnimationFrame( intervalId )
        canvas.style.display = 'none'
        restartBtn.style.display = 'block'
    } else {
        intervalId = requestAnimationFrame(animate)
    }
}

function start(){
    canvas.style.display = 'block'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    animate()
}

// Event listeners
window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'

    document.addEventListener('keydown', (event) =>{
        if (event.code == 'ArrowRight' && direction != "left") {
            direction = "right"
        }
        if (event.code == 'ArrowLeft' && direction != "right") {
            direction = "left"
        }
        if (event.code == 'ArrowUp' && direction != "down") {
            direction = "up"
        }
        if (event.code == 'ArrowDown' && direction != "up") {
            direction = "down"
        }
    })

    startBtn.addEventListener('click', () => {
        start()
    })

    restartBtn.addEventListener('click', () => {
        gameOver = false;
        snakeX = startingX;
        snakeY = startingY;
        direction = startingDirection;
        haveParrot = false;
        score = 0;
        length = 1;
        tail = [{"x": snakeX, "y":snakeY}];
        start()
    })
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}