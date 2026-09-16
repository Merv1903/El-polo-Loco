/** Indicates whether music and game sounds are enabled. */
let musicOn = true;

/* ===========================
   MENU MUSIC
=========================== */

/** Background music for the main menu. */
const menuMusic = new Audio("audio/menu_music.mp3");

menuMusic.loop = true;
menuMusic.volume = 0.3;


/* ===========================
   LEVEL MUSIC
=========================== */

/** Background music for the game level. */
const levelMusic = new Audio("audio/level1_music.mp3");

levelMusic.loop = true;
levelMusic.volume = 0.25;


/* ===========================
   GAME SOUNDS
=========================== */

/** Sound played when the character dies. */
const characterDeathSound =
    new Audio("audio/character_death.mp3");

/** Sound played when the game-over screen appears. */
const gameOverSound =
    new Audio("audio/game_over.mp3");

/** Music played after completing the level. */
const victorySound =
    new Audio("audio/level2_music.mp3");

victorySound.volume = 0.5;

characterDeathSound.volume = 0.5;
gameOverSound.volume = 0.5;


/* ===========================
   MENU MUSIC STARTEN
=========================== */

/**
 * Starts the menu music if music is enabled.
 *
 * Stops and resets the level music first.
 */
function playMenuMusic() {

    if (!musicOn) return;

    levelMusic.pause();
    levelMusic.currentTime = 0;

    menuMusic.play().catch(() => { });

}


/* ===========================
   LEVEL MUSIC STARTEN
=========================== */

/**
 * Starts the level music if music is enabled.
 *
 * Stops and resets the menu music first.
 */
function playLevelMusic() {

    if (!musicOn) return;

    menuMusic.pause();
    menuMusic.currentTime = 0;

    levelMusic.play().catch(() => {});

}


/* ===========================
   ALLE MUSIK STOPPEN
=========================== */

/**
 * Stops and resets all background music.
 */
function stopMusic() {

    menuMusic.pause();
    levelMusic.pause();

    menuMusic.currentTime = 0;
    levelMusic.currentTime = 0;

}


/* ===========================
   GAME SOUNDS STOPPEN
=========================== */

/**
 * Stops and resets all game sounds.
 */
function stopGameSounds() {

    characterDeathSound.pause();
    characterDeathSound.currentTime = 0;

    gameOverSound.pause();
    gameOverSound.currentTime = 0;

    victorySound.pause();
    victorySound.currentTime = 0;

}


/* ===========================
   GAME SOUNDS ABSPIELEN
=========================== */

/**
 * Plays the character death sound if music is enabled.
 */
function playCharacterDeathSound() {

    if (!musicOn) return;

    characterDeathSound.currentTime = 0;

    characterDeathSound.play()
        .catch(() => {});

}


/**
 * Plays the game-over sound if music is enabled.
 */
function playGameOverSound() {

    if (!musicOn) return;

    gameOverSound.currentTime = 0;

    gameOverSound.play()
        .catch(() => {});

}


/* ===========================
  VICTORY SOUND ABSPIELEN
=========================== */

/**
 * Plays the victory sound if music is enabled.
 */
function playVictorySound() {

    if (!musicOn) return;

    victorySound.currentTime = 0;

    victorySound.play()
        .catch(() => {});

}


/* ===========================
   MUSIK PAUSIEREN
=========================== */

/**
 * Pauses all background music without resetting playback position.
 */
function pauseMusic() {

    menuMusic.pause();
    levelMusic.pause();

}


/* ===========================
   LAUTSPRECHER
=========================== */

/**
 * Toggles music and game sounds on or off.
 */
function toggleMusic() {

    musicOn = !musicOn;

    updateMusicButtons();

    if (musicOn) {

        resumeMusic();

    } else {

        pauseMusic();

    }

}


/**
 * Updates the muted state of all available music buttons.
 */
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


/**
 * Resumes the appropriate music based on the current screen.
 */
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

/**
 * Initializes all audio controls and starts the menu music.
 */
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


/**
 * Connects the pause button to the world's pause functionality.
 */
const pauseButton = document.getElementById("pause-btn");

if (pauseButton) {

    pauseButton.onclick = () => {

        if (world) {

            world.togglePause();

        }

    };

}


/**
 * Starts the menu music if music is enabled.
 *
 * Can be used to start the menu music after user interaction.
 */
function startMenuMusicOnce() {

    if (musicOn) {
        playMenuMusic();
    }

}