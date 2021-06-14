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
let speed = 5;

const startingX = 100
const startingY = 80
const startingDirection = "right"
let snakeX = startingX
let snakeY = startingY
let direction = startingDirection
let score = 0

function drawSnake() {
    ctx.beginPath()
    ctx.fillStyle = '#4af0bb'
    ctx.rect(snakeX, snakeY, 20, 20);
    ctx.fill()
    ctx.closePath()
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
    snakeX = snakeX + incrX * speed
    snakeY = snakeY + incrY * speed
}

function collision() {
    if (snakeX + 20 >= canvas.width) {
        gameOver = true
    }
    if (snakeX <= 0) {
        gameOver = true
    }

    if (snakeY + 20 >= canvas.height) {
        gameOver = true
    }
    if (snakeY <= 0) {
        gameOver = true
    }
    
    // when the snake hits the border
    // when the snake hits itself
    // gameOver = true, if hits anything
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawSnake()
    moveSnake()
    collision()
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
        score = 0
        start()
    })
})