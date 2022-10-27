const WIDTH = 800;
const HEIGHT = 600;

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 32;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
    }

    update() {
        this.x += this.velocityX;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > WIDTH) {
            this.x = WIDTH - this.width;
        }
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    moveLeft() {
        this.velocityX = -10;
    }

    moveRight() {
        this.velocityX = 10;
    }

    stopMove() {
        this.velocityX = 0;
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

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

var player = new Player(WIDTH / 2 - PLAYER_WIDTH / 2, HEIGHT - PLAYER_HEIGHT - 32, PLAYER_WIDTH, PLAYER_HEIGHT);
var bullets = [];
var balls = [];

function init() {
}

setInterval(function() {
    balls.push(new Ball(Math.random() * WIDTH, 64, Math.random() * 20 + 20, 'blue'));
}, 1000);


function updateFrame() {
    requestAnimationFrame(updateFrame);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    player.update();
    player.draw();

    for (let bullet of bullets) {
        bullet.update();
        bullet.draw();
    }

    for (let ball of balls) {
        ball.draw();
    }

    bullets = bullets.filter(bullet => bullet.y > 0);
}

function keyDownInput(e) {
    if (e.key == 'a') {
        player.moveLeft();
    } else if (e.key == 'd') {
        player.moveRight();
    } else if (e.key == ' ') {
        bullets.push(new Bullet(player.x + player.width / 2, player.y, 5, 'red'));
    }
}

function keyUpInput(e) {
    if (e.key == 'a') {
        player.stopMove();
    } else if (e.key == 'd') {
        player.stopMove();
    }
}

init();
requestAnimationFrame(updateFrame);
window.addEventListener('keydown',keyDownInput,false);
window.addEventListener('keyup',keyUpInput,false);
