const WIDTH = 800;
const HEIGHT = 600;

const ROAD_WIDTH = 400;
const LINE_WIDTH = 10;
const LINE_HEIGHT = 30;
const LINE_OFFSET = 100;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 100;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

let carSpeed = 10;

let time = 0;

let playerX = WIDTH / 2;
let playerY = HEIGHT - CAR_HEIGHT - 20;
let playerVelocityX = 0;
let playerVelocityY = 0;

let obstacles = [];

class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += carSpeed;
    }

    isColliding() {
        return playerX - CAR_WIDTH / 2 < this.x + this.width &&
            playerX + CAR_WIDTH / 2 > this.x &&
            playerY < this.y + this.height &&
            playerY + CAR_HEIGHT > this.y;
    }
}

function drawBackground() {
    // draw grass
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // draw road
    ctx.fillStyle = "grey";
    ctx.fillRect(WIDTH / 2 - ROAD_WIDTH / 2, 0, ROAD_WIDTH, HEIGHT);

    // draw center lines
    ctx.fillStyle = "white";
    let segmentOffset = WIDTH / 2 - ROAD_WIDTH / 2;
    let segmentWidth = ROAD_WIDTH / 6;

    for (let i = 0; i < 6; i++) {
        let y = (time + i * LINE_OFFSET) % HEIGHT;
        ctx.fillRect(segmentOffset + segmentWidth * 2 - LINE_WIDTH / 2, y, LINE_WIDTH, LINE_HEIGHT);
        ctx.fillRect(segmentOffset + segmentWidth * 4 + LINE_WIDTH / 2, y, LINE_WIDTH, LINE_HEIGHT);
    }

    // draw border lines
    ctx.fillStyle = "red";
    let leftLine = WIDTH / 2 - ROAD_WIDTH / 2 - LINE_WIDTH;
    let rightLine = WIDTH / 2 + ROAD_WIDTH / 2;
    ctx.fillRect(leftLine, 0, LINE_WIDTH, HEIGHT);
    ctx.fillRect(rightLine, 0, LINE_WIDTH, HEIGHT);

    ctx.fillStyle = "white";
    for (let i = 0; i < HEIGHT / LINE_HEIGHT; i++) {
        let y = (time + i * LINE_HEIGHT * 2) % HEIGHT;
        ctx.fillRect(leftLine, y, LINE_WIDTH, LINE_HEIGHT);
        ctx.fillRect(rightLine, y, LINE_WIDTH, LINE_HEIGHT);
    }
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(playerX - CAR_WIDTH / 2, playerY, CAR_WIDTH, CAR_HEIGHT);

}

function updateFrame() {
    requestAnimationFrame(updateFrame);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    time += carSpeed;

    playerX += playerVelocityX;
    playerY += playerVelocityY;

    drawBackground();
    drawCar();

    for (let obstancle of obstacles) {
        obstancle.draw();
        obstancle.update();

        if (obstancle.isColliding()) {
            alert("Game over");
            location.reload();
        }
    }
}

setInterval(function() {
    let min = WIDTH / 2 - ROAD_WIDTH / 2 + CAR_WIDTH;
    let max = WIDTH / 2 + ROAD_WIDTH / 2 - CAR_WIDTH;
    obstacles.push(new Obstacle(min + Math.random() * (max - min), -100, CAR_WIDTH, CAR_HEIGHT));
}, 1000);

function keyDownInput(e) {
    if (e.key == 'ArrowLeft') {
        playerVelocityX = -10;
    } else if (e.key == 'ArrowRight') {
        playerVelocityX = 10;
    } else if (e.key == 'ArrowUp') {
        playerVelocityY = -10;
    } else if (e.key == 'ArrowDown') {
        playerVelocityY = 10;
    }
}

function keyUpInput(e) {
    if (e.key == 'ArrowLeft') {
        playerVelocityX = 0;
    } else if (e.key == 'ArrowRight') {
        playerVelocityX =0;
    } else if (e.key == 'ArrowUp') {
        playerVelocityY =0;
    } else if (e.key == 'ArrowDown') {
        playerVelocityY = 0;
    }
}

requestAnimationFrame(updateFrame);
window.addEventListener('keydown',keyDownInput,false);
window.addEventListener('keyup',keyUpInput,false);
