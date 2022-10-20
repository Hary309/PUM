const WIDTH = 800;
const HEIGHT = 600;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

var rects = [];

class Rect {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}


function init() {
    rects.push(new Rect(0, HEIGHT - 20, WIDTH, 20, "#000000"));
}

function draw() {
    requestAnimationFrame(draw);

    for (let rect of rects) {
        rect.draw();
    }
}

init();
requestAnimationFrame(draw);
