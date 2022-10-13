const WIDTH = 800;
const HEIGHT = 600;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

function draw() {
    requestAnimationFrame(draw);
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
