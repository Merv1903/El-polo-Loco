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

function resizeGame() {

    const size = getGameSize();

    resizeContainer(size.width, size.height);

    resizeOverlay(size.width);

    scaleMenu(size.width);

}

function getGameSize() {

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

    return { width, height };

}

function resizeContainer(width, height) {

    gameContainer.style.width = width + "px";
    gameContainer.style.height = height + "px";

}

function resizeOverlay(width) {

    const overlayContent = document.getElementById("overlay-content");

    if (!overlayContent) return;

    overlayContent.style.width = (width - 8) + "px";
    overlayContent.style.height = "auto";

}



function scaleMenu(width) {

    const scale = width / 720;

    scaleStartButton(scale);
    scaleMusicButton(scale);
    scaleNavigationButtons(scale);

}

function scaleStartButton(scale) {

    document.getElementById("start-btn").style.width =
        `${260 * scale}px`;

}

function scaleMusicButton(scale) {

    document.getElementById("music-btn").style.width =
        `${60 * scale}px`;

}

function scaleNavigationButtons(scale) {

    document
        .querySelectorAll(
            "#manual-btn,#controls-btn,#about-btn,#imprint-btn"
        )
        .forEach(button => {

            button.style.width = `${150 * scale}px`;

        });

}

window.addEventListener("resize", resizeGame);
window.addEventListener("load", init);




function startGame() {

    if (musicOn) {

        playLevelMusic();

    }

    document.getElementById("mobile-controls").style.display = "flex";

    world.startLevel();

}

function backToMenu() {

    levelMusic.pause();
    levelMusic.currentTime = 0;

    document.getElementById("mobile-controls").style.display = "none";

    if (musicOn) {

        playMenuMusic();

    }

    ui.menu.style.display = "flex";

    document.querySelector(".game-container").style.animation =
        "floatGame 4s ease-in-out infinite";

}



function initMobileControls() {

    addMobileButton("btn-left", "LEFT");
    addMobileButton("btn-right", "RIGHT");
    addMobileButton("btn-jump", "SPACE");
    addMobileButton("btn-throw", "D");

}


function addMobileButton(buttonId, key) {

    const button = document.getElementById(buttonId);

    button.addEventListener("touchstart", (event) => {

        event.preventDefault();

        keyboard[key] = true;

    });

    button.addEventListener("touchend", (event) => {

        event.preventDefault();

        keyboard[key] = false;

    });

    button.addEventListener("touchcancel", () => {

        keyboard[key] = false;

    });

}