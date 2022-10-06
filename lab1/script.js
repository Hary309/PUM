const WIDTH = 800;
const HEIGHT = 600;

const COLOR_GREEN = "#00FF00";
const COLOR_BLUE = "#0000FF";

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

let nextColor = COLOR_GREEN;
let currentColorIndex = 0;

drawCircle(WIDTH / 2, HEIGHT - 40, getColor());


setInterval(function() {
    drawCircle(WIDTH / 2, HEIGHT - 40, getColor());
}, 1000);


function drawCircle(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,15,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function getColor() {
    if (currentColorIndex == 0) {
        currentColorIndex = 1;
        return COLOR_BLUE;
    } else {
        currentColorIndex = 0;
        return COLOR_GREEN;
    }
}
