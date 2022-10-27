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

function init() {
}

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

init();
requestAnimationFrame(draw);
