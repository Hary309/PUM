const WIDTH = 800;
const HEIGHT = 600;

const RECT_WIDTH = 40;
const RECT_SEGMENT_HEIGHT = 40;
const FLOOR_HEIGHT = 20;
const CIRCLE_RADIUS = 20;
const STAIRCASE_OFFSET = 300;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

var objects = [];

class Rect {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    update() {}

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.vecoityY = 0;
        this.lastStairX = 5;
        this.lastStairY = 5;
    }

    update() {
        this.x -= 1;
        this.y += this.vecoityY;

        let currentStairX = parseInt((this.x - STAIRCASE_OFFSET) / RECT_WIDTH, 10);
        let currentStairY = parseInt((400 - (this.y - FLOOR_HEIGHT - RECT_SEGMENT_HEIGHT * 4)) / RECT_SEGMENT_HEIGHT);

        if (this.lastStairX != currentStairX) {
            this.lastStairX = currentStairX;
            this.beginFall();
        }

        if (this.lastStairY != currentStairY) {
            this.lastStairY = currentStairY;
            this.endFall();
        }
    }

    beginFall() {
        this.vecoityY = 4;
    }

    endFall() {
        this.vecoityY = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function init() {
    objects.push(new Rect(0, HEIGHT - FLOOR_HEIGHT, WIDTH, 20, "#000000"));
}

// create rect every 1 second
setInterval(function() {
    if (objects.length > 5) {
        return;
    }

    const height = FLOOR_HEIGHT + RECT_SEGMENT_HEIGHT * objects.length;

    const x = STAIRCASE_OFFSET + objects.length * RECT_WIDTH;
    const y = HEIGHT - height;
    const width = RECT_WIDTH;

    objects.push(new Rect(x, y, width, height, "#000000"));

    if (objects.length == 6) {
        objects.push(new Circle(x + RECT_WIDTH / 2, y - CIRCLE_RADIUS, CIRCLE_RADIUS, "#FF0000"));
    }
}, 10);

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0,0, WIDTH, HEIGHT);

    for (let object of objects) {
        object.update();
        object.draw();
    }
}

init();
requestAnimationFrame(draw);
