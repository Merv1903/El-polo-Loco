/**
 * Initializes all touch controls.
 *
 * Connects each mobile control button to its
 * corresponding keyboard input.
 */
function initTouchControls() {

    addTouchButton("btn-left", "LEFT");
    addTouchButton("btn-right", "RIGHT");
    addTouchButton("btn-jump", "SPACE");
    addTouchButton("btn-throw", "D");

}


/**
 * Connects a touch button to a keyboard input.
 *
 * @param {string} buttonId - ID of the touch button.
 * @param {string} key - Keyboard input key to control.
 */
function addTouchButton(buttonId, key) {

    const button = document.getElementById(buttonId);

    if (!button) return;

    addPointerDown(button, key);
    addPointerUp(button, key);

}


/**
 * Activates a keyboard input when a touch begins.
 *
 * @param {HTMLElement} button - Touch button element.
 * @param {string} key - Keyboard input key to activate.
 */
function addPointerDown(button, key) {

    button.addEventListener("pointerdown", (event) => {

        event.preventDefault();
        keyboard[key] = true;

    });

}


/**
 * Releases a keyboard input when the touch ends or is cancelled.
 *
 * @param {HTMLElement} button - Touch button element.
 * @param {string} key - Keyboard input key to release.
 */
function addPointerUp(button, key) {

    function release(event) {

        event.preventDefault();
        keyboard[key] = false;

    }

    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("pointercancel", release);

}