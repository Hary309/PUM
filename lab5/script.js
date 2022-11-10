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

let carSpeed = 4;

let time = 0;

let playerX = WIDTH / 2;
let playerY = HEIGHT - CAR_HEIGHT - 20;
let playerVelocityX = 0;
let playerVelocityY = 0;

let obstacles = [];
let bullets = [];
let bonuses = [];

let isGameOver = false;

let score = 0;

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

    isCollidingWithPlayer() {
        return playerX - CAR_WIDTH / 2 < this.x + this.width &&
            playerX + CAR_WIDTH / 2 > this.x &&
            playerY < this.y + this.height &&
            playerY + CAR_HEIGHT > this.y;
    }
}

class Bonus {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = "gold";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += carSpeed * 2;
    }

    isCollidingWithPlayer() {
        return playerX - CAR_WIDTH / 2 < this.x + this.width &&
            playerX + CAR_WIDTH / 2 > this.x &&
            playerY < this.y + this.height &&
            playerY + CAR_HEIGHT > this.y;
    }
}

class Bullet {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update() {
        this.y -= 10;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawBackground() {
    let roadTime = time * 2;

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
        let y = (roadTime + i * LINE_OFFSET) % HEIGHT;
        ctx.fillRect(segmentOffset + segmentWidth * 2 - LINE_WIDTH / 2, y - LINE_OFFSET / 4, LINE_WIDTH, LINE_HEIGHT);
        ctx.fillRect(segmentOffset + segmentWidth * 4 + LINE_WIDTH / 2, y - LINE_OFFSET / 4, LINE_WIDTH, LINE_HEIGHT);
    }

    // draw border lines
    ctx.fillStyle = "red";
    let leftLine = WIDTH / 2 - ROAD_WIDTH / 2 - LINE_WIDTH;
    let rightLine = WIDTH / 2 + ROAD_WIDTH / 2;
    ctx.fillRect(leftLine, 0, LINE_WIDTH, HEIGHT);
    ctx.fillRect(rightLine, 0, LINE_WIDTH, HEIGHT);

    ctx.fillStyle = "white";
    for (let i = 0; i < HEIGHT / LINE_HEIGHT; i++) {
        let y = (roadTime + i * LINE_HEIGHT * 2) % HEIGHT;
        ctx.fillRect(leftLine, y - LINE_HEIGHT / 2, LINE_WIDTH, LINE_HEIGHT);
        ctx.fillRect(rightLine, y - LINE_HEIGHT / 2, LINE_WIDTH, LINE_HEIGHT);
    }
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(playerX - CAR_WIDTH / 2, playerY, CAR_WIDTH, CAR_HEIGHT);
}

function updateFrame() {
    requestAnimationFrame(updateFrame);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();
    drawCar();

    // draw score
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // draw speed
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Speed: " + carSpeed.toFixed(2), 10, 60);

    if (isGameOver) {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Game Over. Press F5 to restart", WIDTH / 2 - 150, HEIGHT / 2);
        return;
    }

    carSpeed += 0.001;

    time += carSpeed;

    playerX += playerVelocityX;
    playerY += playerVelocityY;

    for (let bullet of bullets) {
        bullet.update();
        bullet.draw();
    }

    for (let bonus of bonuses) {
        bonus.update();
        bonus.draw();
    }

    bonuses = bonuses.filter(bonus => bonus.y < HEIGHT);
    bullets = bullets.filter(bullet => bullet.y > 0);

    for (let bonus of bonuses) {
        if (bonus.isCollidingWithPlayer()) {
            score += 10;
            bonuses = bonuses.filter(b => b !== bonus);
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];
        obstacle.update();
        obstacle.draw();

        if (obstacle.isCollidingWithPlayer()) {
            isGameOver = true;
            carSpeed = 0;
            break;
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
            let bullet = bullets[j];
            if (bullet.x - bullet.radius < obstacle.x + obstacle.width &&
                bullet.x + bullet.radius > obstacle.x &&
                bullet.y - bullet.radius < obstacle.y + obstacle.height &&
                bullet.y + bullet.radius > obstacle.y) {
                bullets.splice(j, 1);
                obstacles.splice(i, 1);
                break;
            }
        }
    }

    obstacles = obstacles.filter(obstacle => obstacle.y < HEIGHT);
}

setInterval(function () {
    let min = WIDTH / 2 - ROAD_WIDTH / 2 + CAR_WIDTH;
    let max = WIDTH / 2 + ROAD_WIDTH / 2 - CAR_WIDTH;
    obstacles.push(new Obstacle(min + Math.random() * (max - min), -100, CAR_WIDTH, CAR_HEIGHT));
}, 1000);

setInterval(function () {
    let min = WIDTH / 2 - ROAD_WIDTH / 2 + CAR_WIDTH;
    let max = WIDTH / 2 + ROAD_WIDTH / 2 - CAR_WIDTH;
    bonuses.push(new Bonus(min + Math.random() * (max - min), -100, 25, 25));
}, 1500);

function keyDownInput(e) {
    if (e.key == 'ArrowLeft') {
        playerVelocityX = -4;
    } else if (e.key == 'ArrowRight') {
        playerVelocityX = 4;
    } else if (e.key == 'ArrowUp') {
        playerVelocityY = -4;
    } else if (e.key == 'ArrowDown') {
        playerVelocityY = 4;
    } else if (e.key == ' ') {
        bullets.push(new Bullet(playerX, playerY, 5, "blue"));
    }
}

function keyUpInput(e) {
    if (e.key == 'ArrowLeft') {
        playerVelocityX = 0;
    } else if (e.key == 'ArrowRight') {
        playerVelocityX = 0;
    } else if (e.key == 'ArrowUp') {
        playerVelocityY = 0;
    } else if (e.key == 'ArrowDown') {
        playerVelocityY = 0;
    }
}

requestAnimationFrame(updateFrame);
window.addEventListener('keydown', keyDownInput, false);
window.addEventListener('keyup', keyUpInput, false);
