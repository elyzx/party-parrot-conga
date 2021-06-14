let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
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
let direction = startingDirection
let score = 0
let haveParrot = false
let parrotX = 0
let parrotY = 0 

function drawSnake() {
    ctx.beginPath()
    ctx.fillStyle = '#4af0bb'
    ctx.rect(snakeX, snakeY, snakeWidth, snakeWidth);
    ctx.fill()
    ctx.closePath()
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
    }
    currentStep++;
}

function collision() {
    // hit the borders
    if (snakeX + snakeWidth >= canvas.width) {
        gameOver = true
    }
    if (snakeX < 0) {
        gameOver = true
        console.log("hit left:", snakeX, "/", snakeY)
    }

    if (snakeY + snakeWidth >= canvas.height) {
        gameOver = true
    }
    if (snakeY < 0) {
        gameOver = true
    }
    
    // check if conga hits itself
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
            haveParrot = false
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    showScore()
    moveSnake()
    drawSnake()
    collision()
    collectParrot()
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

window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'

    document.addEventListener('keypress', (event) =>{
        console.log("key pressed:", event.code)
        if (event.code == 'KeyD') {
            direction = "right"
        }
        if (event.code == 'KeyA') {
            direction = "left"
        }
        if (event.code == 'KeyW') {
            direction = "up"
        }
        if (event.code == 'KeyS') {
            direction = "down"
        }
        console.log("direction changed to: ", direction)
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
        score = 0
        start()
    })
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}