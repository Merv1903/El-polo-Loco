function initTouchControls() {

    addTouchButton("btn-left", "LEFT");
    addTouchButton("btn-right", "RIGHT");
    addTouchButton("btn-jump", "SPACE");
    addTouchButton("btn-throw", "D");

}

function addTouchButton(buttonId, key) {

    const button = document.getElementById(buttonId);

    if (!button) return;

    addPointerDown(button, key);
    addPointerUp(button, key);

}

function addPointerDown(button, key) {

    button.addEventListener("pointerdown", (event) => {

        event.preventDefault();
        keyboard[key] = true;

    });

}

function addPointerUp(button, key) {

    function release(event) {

        event.preventDefault();
        keyboard[key] = false;

    }

    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("pointercancel", release);

}