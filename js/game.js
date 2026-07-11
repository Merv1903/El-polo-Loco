let canvas;
let gameContainer;
let world;

function init() {
    canvas = document.getElementById("canvas");
    gameContainer = document.querySelector(".game-container");

    resizeGame();

    world = new World(canvas);
}

function resizeGame() {

    let width = 720;
    let height = 480;

    if (window.innerWidth <= 1025) {

        const maxWidth = window.innerWidth * 0.95;
        const maxHeight = window.innerHeight * 0.95;

        width = maxWidth;
        height = width / 1.5;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * 1.5;
        }
    }

    gameContainer.style.width = width + "px";
    gameContainer.style.height = height + "px";

    scaleMenu(width);
}

function scaleMenu(width) {

    const scale = width / 720;

    document.querySelectorAll(".menu-icon").forEach(icon => {
        icon.style.transform = `scale(${scale})`;
    });
}

window.addEventListener("resize", resizeGame);
window.addEventListener("load", init);