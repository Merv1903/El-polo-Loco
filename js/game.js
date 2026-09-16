/** Reference to the game canvas. */
let canvas;

/** Reference to the game container. */
let gameContainer;

/** Reference to the current game world. */
let world;

/** Stores the current keyboard input state. */
let keyboard = new Keyboard();


/**
 * Handles keyboard key presses.
 *
 * Updates the corresponding keyboard input state.
 */
window.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") keyboard.RIGHT = true;

    if (event.key === "ArrowLeft") keyboard.LEFT = true;

    if (event.key === " ") keyboard.SPACE = true;

    if (event.key === "ArrowUp") keyboard.UP = true;

    if (event.key.toLowerCase() === "d") keyboard.D = true;

});


/**
 * Handles keyboard key releases.
 *
 * Resets the corresponding keyboard input state.
 */
window.addEventListener("keyup", (event) => {

    if (event.key === "ArrowRight") keyboard.RIGHT = false;

    if (event.key === "ArrowLeft") keyboard.LEFT = false;

    if (event.key === " ") keyboard.SPACE = false;

    if (event.key === "ArrowUp") keyboard.UP = false;

});


/**
 * Initializes the game.
 *
 * Gets the required DOM elements, resizes the game,
 * creates the world and initializes touch controls.
 */
function init() {

    canvas = document.getElementById("canvas");
    gameContainer = document.querySelector(".game-container");

    resizeGame();

    world = new World(canvas);

    initTouchControls();

}


/**
 * Resizes the game whenever the browser window changes size.
 */
window.addEventListener("resize", resizeGame);


/**
 * Starts the game and switches to the level music.
 *
 * Displays the mobile controls and starts the current level.
 */
function startGame() {

    if (musicOn) {

        stopMusic();
        playLevelMusic();

    }

    document.getElementById("game-controls").style.display = "flex";

    world.startLevel();

}


/**
 * Returns to the main menu.
 *
 * Stops the current game music, hides the game controls
 * and displays the menu with its animation and music.
 */
function backToMenu() {

    if (world) {

        world.backToMenu();

    }

    stopMusic();

    document.getElementById("game-controls").style.display = "none";

    ui.menu.style.display = "flex";

    document.querySelector(".game-container").style.animation =
        "floatGame 4s ease-in-out infinite";

    if (musicOn) {

        playMenuMusic();

    }

}