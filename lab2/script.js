const WIDTH = 800;
const HEIGHT = 600;

const RECT_WIDTH = 20;
const RECT_SEGMENT_HEIGHT = 20;

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

// create rect every 1 second
setInterval(function() {
    if (rects.length > 5) {
        return;
    }

    const offset = 200;
    console.log("Adding at ", offset + rects.length * RECT_WIDTH, HEIGHT - 20, RECT_WIDTH, RECT_SEGMENT_HEIGHT * rects.length);

    const height = RECT_SEGMENT_HEIGHT * (rects.length + 1);

    const x = offset + rects.length * RECT_WIDTH;
    const y = HEIGHT - height;
    const width = RECT_WIDTH;

    rects.push(new Rect(x, y, width, height, "#000000"));
}, 1000);

function draw() {
    requestAnimationFrame(draw);

    console.log("Rendering ", rects.length, " rects");

    for (let rect of rects) {
        rect.draw();
    }
}

init();
requestAnimationFrame(draw);
