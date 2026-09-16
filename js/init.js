/**
 * Stores references to the user interface elements.
 */
let ui = {};


/**
 * Initializes the user interface after the page has loaded.
 *
 * Collects all required DOM elements and starts the
 * game, menu and audio initialization.
 */
window.addEventListener("load", () => {

    ui = {

        menu: document.getElementById("menu"),

        overlay: document.getElementById("overlay"),

        overlayTitle: document.getElementById("overlay-title"),

        overlayBody: document.getElementById("overlay-body"),

        overlayContent: document.getElementById("overlay-content"),

        start: document.getElementById("start-btn"),

        manual: document.getElementById("manual-btn"),

        controls: document.getElementById("controls-btn"),

        about: document.getElementById("about-btn"),

        imprint: document.getElementById("imprint-btn"),

        music: document.getElementById("music-btn"),

        close: document.getElementById("close-btn")

    };

    init();          // game.js

    initMenu();      // menu.js

    initAudio();     // audio.js

});