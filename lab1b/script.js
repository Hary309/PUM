const WIDTH = 800;
const HEIGHT = 600;
const COLOR_GREEN = "#00FF00";
const COLOR_BLUE = "#0000FF";

let animation = 0;

let currentSolidColor = COLOR_BLUE;
let currentColorIndex = 1;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");
let CIRCLE_Y = HEIGHT / 2;

function draw() {

    requestAnimationFrame(draw);

    animation += 0.05;

    ctx.clearRect(0,0, WIDTH, HEIGHT);
    drawCircle(64, CIRCLE_Y, currentSolidColor);
    drawCircle(320, CIRCLE_Y, getGradientColor());
    drawCircle(576, getPosYAnimation(), getGradientColor());
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

function getPosYAnimation() {
    let anim = Math.pow(Math.sin(animation), 2);

    return HEIGHT / 2 - 100 * anim;
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

function getGradientColor() {
    let progress = Math.pow(Math.sin(animation), 2);
    let r = 0;
    let g = Math.floor(255 * (progress));
    let b = Math.floor(255 * (1 - progress));

    return `rgb(${r},${g},${b})`;
}
