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
    }

    draw() {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
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
var objects = [];

function init() {
}

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    player.draw();

    for (let object of objects) {
        object.update();
        object.draw();
    }
}

init();
requestAnimationFrame(draw);
