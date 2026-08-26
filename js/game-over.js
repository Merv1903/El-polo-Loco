const gameOverMenu =
    document.getElementById("game-over-menu");

const restartButton =
    document.getElementById("restart-btn");

const gameOverHomeButton =
    document.getElementById("gameover-home-btn");


function showGameOverMenu() {

    gameOverMenu.style.display = "flex";

}


function hideGameOverMenu() {

    gameOverMenu.style.display = "none";

}


restartButton.addEventListener("click", () => {

    hideGameOverMenu();

    world.startLevel();

});


gameOverHomeButton.addEventListener("click", () => {

    hideGameOverMenu();

    world.backToMenu();

    document.getElementById("menu").style.display = "flex";

});