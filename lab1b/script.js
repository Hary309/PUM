const WIDTH = 800;
const HEIGHT = 600;
const COLOR_GREEN = "#00FF00";
const COLOR_BLUE = "#0000FF";

let animation = 0;
let colorAnimation = 0;
let colorAnimationVelocity = 1;

let currentSolidColor = COLOR_BLUE;
let currentColorIndex = 1;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");
let CIRCLE_Y = HEIGHT / 2;

function draw() {

    requestAnimationFrame(draw);

    animation += 1;
    colorAnimation += colorAnimationVelocity;

    if (colorAnimation > 60) {
        colorAnimationVelocity = -1;
    } else if (colorAnimation < 0) {
        colorAnimationVelocity = 1;
    }

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
    let anim = Math.pow(Math.sin(animation / 10), 2);

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
    let progress = (colorAnimation) * ( 255 / 60);
    let r = 0;
    let g = progress;
    let b = 255 - progress;

    return `rgb(${r},${g},${b})`;
}
