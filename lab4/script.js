const WIDTH = 800;
const HEIGHT = 600;

let cavnas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

function updateFrame() {
    requestAnimationFrame(updateFrame);
}

function keyDownInput(e) {
}

function keyUpInput(e) {
}

init();
requestAnimationFrame(updateFrame);
window.addEventListener('keydown',keyDownInput,false);
window.addEventListener('keyup',keyUpInput,false);
