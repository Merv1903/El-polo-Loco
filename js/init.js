let ui = {};

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

    console.log("Game initialized");

    init();          // game.js

    initMenu();      // menu.js

    initAudio();     // audio.js

});