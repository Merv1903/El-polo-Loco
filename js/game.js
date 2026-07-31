let canvas;
let gameContainer;
let world;
let keyboard = new Keyboard();

window.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") keyboard.RIGHT = true;

    if (event.key === "ArrowLeft") keyboard.LEFT = true;

    if (event.key === " ") keyboard.SPACE = true;

    if (event.key === "ArrowUp") keyboard.UP = true;

});

window.addEventListener("keyup", (event) => {

    if (event.key === "ArrowRight") keyboard.RIGHT = false;

    if (event.key === "ArrowLeft") keyboard.LEFT = false;

    if (event.key === " ") keyboard.SPACE = false;

    if (event.key === "ArrowUp") keyboard.UP = false;

});

function init() {

    canvas = document.getElementById("canvas");
    gameContainer = document.querySelector(".game-container");

    resizeGame();

    world = new World(canvas);

    initTouchControls();

}

window.addEventListener("resize", resizeGame);
window.addEventListener("load", init);

function startGame() {

    if (musicOn) {

        stopMusic();
        playLevelMusic();

    }

    document.getElementById("mobile-controls").style.display = "flex";

    world.startLevel();

}

function backToMenu() {

    if (world) {

        world.backToMenu();

    }

    stopMusic();

    document.getElementById("mobile-controls").style.display = "none";

    ui.menu.style.display = "flex";

    document.querySelector(".game-container").style.animation =
        "floatGame 4s ease-in-out infinite";

    if (musicOn) {

        playMenuMusic();

    }

}