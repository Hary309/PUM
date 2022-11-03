const WIDTH = 800;
const HEIGHT = 600;

const ROAD_WIDTH = 400;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

let carSpeed = 10;

function drawBackground() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "grey";
    ctx.fillRect(WIDTH / 2 - ROAD_WIDTH / 2, 0, ROAD_WIDTH, HEIGHT);

    ctx.fillStyle = "white";

    ctx.fillRect(WIDTH / 2 - ROAD_WIDTH / 2 + 10, 0, 10, HEIGHT);
    ctx.fillRect(WIDTH / 2 + ROAD_WIDTH / 2 - 20, 0, 10, HEIGHT);
}

function updateFrame() {
    requestAnimationFrame(updateFrame);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();
}

function keyDownInput(e) {
}

function keyUpInput(e) {
}

requestAnimationFrame(updateFrame);
window.addEventListener('keydown',keyDownInput,false);
window.addEventListener('keyup',keyUpInput,false);
