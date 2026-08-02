function resizeGame() {

    const size = getGameSize();

    console.log(
        "Screen:",
        window.innerWidth,
        window.innerHeight,
        "Game:",
        size.width,
        size.height
    );

    resizeContainer(size.width, size.height);

    resizeOverlay(size.width);

    scaleMenu(size.width);

    scaleMobileControls(size.width);

}


function scaleMobileControls(width) {

    const scale = width / 720;

    const controls = document.getElementById("game-controls");

    if (!controls) return;

    document.querySelector(".top-controls").style.bottom =
        `${170 * scale}px`;

    document.querySelector(".bottom-controls").style.bottom =
        `${5 * scale}px`;

    document.getElementById("btn-throw").style.left =
        `${-25 * scale}px`;

    document.getElementById("btn-jump").style.right =
        `${-25 * scale}px`;

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

    return {
        width,
        height
    };

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