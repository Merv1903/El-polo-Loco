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
   GAME SOUNDS
=========================== */

const characterDeathSound =
    new Audio("audio/character_death.mp3");

const gameOverSound =
    new Audio("audio/game_over.mp3");

characterDeathSound.volume = 0.5;
gameOverSound.volume = 0.5;


/* ===========================
   MENU MUSIC STARTEN
=========================== */

function playMenuMusic() {

    console.log("playMenuMusic");

    if (!musicOn) return;

    levelMusic.pause();
    levelMusic.currentTime = 0;

    menuMusic.play().catch(error => console.log(error));
}


/* ===========================
   LEVEL MUSIC STARTEN
=========================== */

function playLevelMusic() {

    console.log("playLevelMusic");

    if (!musicOn) return;

    menuMusic.pause();
    menuMusic.currentTime = 0;

    levelMusic.play().catch(error => console.log(error));
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
   ALLE MUSIK STOPPEN
=========================== */

function stopMusic() {

    menuMusic.pause();
    levelMusic.pause();

    menuMusic.currentTime = 0;
    levelMusic.currentTime = 0;

}


/* ===========================
   GAME SOUNDS STOPPEN
=========================== */

function stopGameSounds() {

    characterDeathSound.pause();
    characterDeathSound.currentTime = 0;

    gameOverSound.pause();
    gameOverSound.currentTime = 0;

}


/* ===========================
   GAME SOUNDS ABSPIELEN
=========================== */

function playCharacterDeathSound() {

    if (!musicOn) return;

    characterDeathSound.currentTime = 0;
    characterDeathSound.play()
        .catch(error => console.log(error));

}


function playGameOverSound() {

    if (!musicOn) return;

    gameOverSound.currentTime = 0;
    gameOverSound.play()
        .catch(error => console.log(error));

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

    playMenuMusic();

}

const pauseButton = document.getElementById("pause-btn");

if (pauseButton) {

    pauseButton.onclick = () => {

        if (world) {

            world.togglePause();

        }

    };

}


function startMenuMusicOnce() {

    if (musicOn) {
        playMenuMusic();
    }

}