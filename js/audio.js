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
   LAUTSPRECHER
=========================== */

function toggleMusic() {

    musicOn = !musicOn;

    if (musicOn) {

        ui.music.classList.remove("muted");

        if (ui.menu.style.display !== "none") {

            playMenuMusic();

        } else {

            playLevelMusic();

        }

    } else {

        stopMusic();

        ui.music.classList.add("muted");

    }
}

/* ===========================
   AUDIO INITIALISIEREN
=========================== */
function initAudio() {

    ui.music.onclick = toggleMusic;

    setTimeout(() => {

        menuMusic.play().catch(() => {});

    }, 2000);
}