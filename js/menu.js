function initMenu(){

    ui.start.onclick = () => {

        ui.menu.style.display = "none";

        document.querySelector(".game-container").style.animation = "none";

        playLevelMusic();

        startGame();

    };

    ui.manual.onclick = () => openOverlay("manual");

    ui.controls.onclick = () => openOverlay("controls");

    ui.about.onclick = () => openOverlay("about");

    ui.imprint.onclick = () => openOverlay("imprint");

    ui.close.onclick = closeOverlay;

}