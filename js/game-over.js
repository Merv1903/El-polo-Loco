/** Reference to the game-over menu. */
const gameOverMenu =
    document.getElementById("game-over-menu");

/** Reference to the restart button. */
const restartButton =
    document.getElementById("restart-btn");

/** Reference to the home button on the game-over screen. */
const gameOverHomeButton =
    document.getElementById("gameover-home-btn");


/**
 * Displays the game-over menu.
 */
function showGameOverMenu() {

    gameOverMenu.style.display = "flex";

}


/**
 * Hides the game-over menu.
 */
function hideGameOverMenu() {

    gameOverMenu.style.display = "none";

}


/**
 * Restarts the current level when the restart button is clicked.
 */
restartButton.addEventListener("click", () => {

    console.log("1. NOCHMAL SPIELEN geklickt");

    hideGameOverMenu();

    console.log(
        "2. Vor startLevel - game-active:",
        document.getElementById("game-controls").classList.contains("game-active")
    );

    world.startLevel();

    console.log(
        "3. Nach startLevel - game-active:",
        document.getElementById("game-controls").classList.contains("game-active")
    );

    console.log(
        "4. game-controls display:",
        getComputedStyle(document.getElementById("game-controls")).display
    );

    console.log(
        "INLINE STYLE:",
        document.getElementById("game-controls").style.display
    );

    console.log(
        "COMPUTED STYLE:",
        getComputedStyle(document.getElementById("game-controls")).display
    );
});


/**
 * Returns to the main menu when the home button is clicked.
 */
gameOverHomeButton.addEventListener("click", () => {

    hideGameOverMenu();

    world.backToMenu();

    document.getElementById("menu").style.display = "flex";

});