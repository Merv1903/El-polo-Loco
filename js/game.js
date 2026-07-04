let canvas;
let world;

function init() {
    canvas = document.getElementById("canvas");

    resizeCanvas();

    world = new World(canvas);
}

function resizeCanvas() {
    if (window.innerWidth > 1025) {
        canvas.style.width = "720px";
        canvas.style.height = "480px";
        return;
    }

    const maxWidth = window.innerWidth * 0.95;
    const maxHeight = window.innerHeight * 0.95;

    let width = maxWidth;
    let height = width / 1.5;

    if (height > maxHeight) {
        height = maxHeight;
        width = height * 1.5;
    }

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}

window.addEventListener("resize", resizeCanvas);
window.onload = init;