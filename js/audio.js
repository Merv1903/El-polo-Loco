let musicOn = true;

/* ===========================
   MENU MUSIC
=========================== */

const menuMusic = new Audio("audio/menu_music.mp3");

menuMusic.loop = true;
menuMusic.volume = 0.3;


/* ===========================
   LEVEL MUSIC
=========================== */

const levelMusic = new Audio("audio/level1_music.mp3");

levelMusic.loop = true;
levelMusic.volume = 0.25;


/* ===========================
   MENU MUSIC STARTEN
=========================== */

function playMenuMusic() {

    if (!musicOn) return;

    levelMusic.pause();
    levelMusic.currentTime = 0;

    menuMusic.play().catch(() => {});
}

/* ===========================
   LEVEL MUSIC STARTEN
=========================== */

function playLevelMusic() {

    if (!musicOn) return;

    menuMusic.pause();
    menuMusic.currentTime = 0;

    levelMusic.play();
}


/* ===========================
   ALLE MUSIK STOPPEN
=========================== */

function stopMusic() {

    menuMusic.pause();
    levelMusic.pause();

    menuMusic.currentTime = 0;
    levelMusic.currentTime = 0;
}

/* ===========================
   MUSIK PAUSIEREN
=========================== */

function pauseMusic() {

    menuMusic.pause();
    levelMusic.pause();

}

/* ===========================
   LAUTSPRECHER
=========================== */
function toggleMusic() {

    musicOn = !musicOn;

    updateMusicButtons();

    if (musicOn) {

        resumeMusic();

    } else {

      pauseMusic();

    }

}

function updateMusicButtons() {

    const buttons = [
        ui.music,
        document.getElementById("music-btn-mobile")
    ];

    buttons.forEach(button => {

        if (!button) return;

        button.classList.toggle("muted", !musicOn);

    });

}


function resumeMusic() {

    if (ui.menu.style.display !== "none") {

        playMenuMusic();

    } else {

        playLevelMusic();

    }

}

/* ===========================
   AUDIO INITIALISIEREN
=========================== */
function initAudio() {

    ui.music.onclick = toggleMusic;

    const mobileMusic = document.getElementById("music-btn-mobile");

    if (mobileMusic) {
        mobileMusic.onclick = toggleMusic;
    }

    const homeButton = document.getElementById("home-btn");

    if (homeButton) {
        homeButton.onclick = backToMenu;
    }

    setTimeout(() => {
        menuMusic.play().catch(() => {});
    }, 2000);
}