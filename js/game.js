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

    const overlayContent = document.getElementById("overlay-content");

    if (overlayContent) {

        overlayContent.style.width = (width - 8) + "px";

        /* KEINE Höhe setzen! */
        overlayContent.style.height = "auto";

    }

    scaleMenu(width);
}

function scaleMenu(width) {
  const scale = width / 720;

  // Startbutton
  document.getElementById("start-btn").style.width = `${260 * scale}px`;

  // Musik
  document.getElementById("music-btn").style.width = `${60 * scale}px`;

  // Menübuttons
  document
    .querySelectorAll("#manual-btn,#controls-btn,#about-btn,#imprint-btn")
    .forEach((btn) => {
      btn.style.width = `${150 * scale}px`;
    });
}

window.addEventListener("resize", resizeGame);
window.addEventListener("load", init);




function startGame() {

    if (musicOn) {

        playLevelMusic();

    }

    world.startLevel();

}

function backToMenu() {

    levelMusic.pause();
    levelMusic.currentTime = 0;

    if (musicOn) {

        playMenuMusic();

    }

    ui.menu.style.display = "flex";

    document.querySelector(".game-container").style.animation =
        "floatGame 4s ease-in-out infinite";

}