const WIDTH = 800;
const HEIGHT = 600;

const ROAD_WIDTH = 400;
const LINE_WIDTH = 10;
const LINE_HEIGHT = 30;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

let carSpeed = 10;
let carPosition = 0;

function drawBackground() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "grey";
    ctx.fillRect(WIDTH / 2 - ROAD_WIDTH / 2, 0, ROAD_WIDTH, HEIGHT);

    ctx.fillStyle = "white";

    let segmentOffset = WIDTH / 2 - ROAD_WIDTH / 2;
    let segmentWidth = ROAD_WIDTH / 6;

    ctx.fillRect(segmentOffset + segmentWidth * 2 - LINE_WIDTH, carPosition, LINE_WIDTH, LINE_HEIGHT);
    ctx.fillRect(segmentOffset + segmentWidth * 4 + LINE_WIDTH, carPosition, LINE_WIDTH, LINE_HEIGHT);
}

function updateFrame() {
    requestAnimationFrame(updateFrame);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    carPosition += carSpeed;

    if (carPosition > HEIGHT) {
        carPosition = 0;
    }

    drawBackground();
}

function keyDownInput(e) {
}

function keyUpInput(e) {
}

requestAnimationFrame(updateFrame);
window.addEventListener('keydown',keyDownInput,false);
window.addEventListener('keyup',keyUpInput,false);
