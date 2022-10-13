const WIDTH = 800;
const HEIGHT = 600;
const COLOR_GREEN = "#00FF00";
const COLOR_BLUE = "#0000FF";

let currentSolidColor = COLOR_GREEN;
let currentColorIndex = 0;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");
let CIRCLE_Y = HEIGHT / 2;

function draw() {
    requestAnimationFrame(draw);

    drawCircle(64, CIRCLE_Y, currentSolidColor);
}

requestAnimationFrame(draw);

setInterval(function() {
    currentSolidColor = getSolidColor();
}, 1000);


function drawCircle(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,40,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function getSolidColor() {
    if (currentColorIndex == 0) {
        currentColorIndex = 1;
        return COLOR_BLUE;
    } else {
        currentColorIndex = 0;
        return COLOR_GREEN;
    }
}

