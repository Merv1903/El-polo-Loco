function initTouchControls() {

    addTouchButton("btn-left", "LEFT");
    addTouchButton("btn-right", "RIGHT");
    addTouchButton("btn-jump", "SPACE");
    addTouchButton("btn-throw", "D");

}

function addTouchButton(buttonId, key) {

    const button = document.getElementById(buttonId);

    if (!button) return;

    button.addEventListener("touchstart", (event) => {

        event.preventDefault();

        keyboard[key] = true;

    });

    button.addEventListener("touchend", (event) => {

        event.preventDefault();

        keyboard[key] = false;

    });

}