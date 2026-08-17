class World {

    canvas;
    ctx;

    gameRunning = false;
    paused = false;

    lastAnimation = 0;

    startScreen = new Image();
    pauseOverlay = new Image();

    level;
    character;
    statusBar;
    coinBar;
    bottleBar;

    showStartScreen = true;

    camera_x = 0;


    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.level = new Level();

        this.character =
            new Character(keyboard, this);

        this.statusBar = new StatusBar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();

        this.loadScreens();

    }


    loadScreens() {

        this.startScreen.src =
            "img/9_intro_outro_screens/start/startscreen_1.png";

        this.pauseOverlay.src =
            "img/9_intro_outro_screens/start/controls_overlay.png";

        this.startScreen.onload = () => {

            this.draw();

        };

    }


    run() {

        if (this.gameRunning) return;

        this.gameRunning = true;

        this.gameLoop = setInterval(() => {

            if (!this.paused) {

                this.updateGame();

            }

            this.draw();

        }, 1000 / 60);

    }


    updateGame() {

        this.updateCharacter();
        this.updateEnemies();
        this.checkEnemyCollisions();
        this.collectItems();

    }


    updateCharacter() {

        this.character.move();

        const now = Date.now();

        if (
            now - this.lastAnimation >= 180
        ) {

            this.character.animate();

            this.lastAnimation = now;

        }

    }


    updateEnemies() {

        this.level.chickens.forEach((chicken) => {

            chicken.move();

        });

        this.removeDeadEnemies();

    }


    removeDeadEnemies() {

        this.level.chickens =
            this.level.chickens.filter(
                (chicken) => !chicken.remove
            );

    }


    startLevel() {

        this.showStartScreen = false;

        this.camera_x = 0;

        this.run();

    }


    stopLevel() {

        this.gameRunning = false;

        clearInterval(this.gameLoop);

    }


    backToMenu() {

        this.stopLevel();

        this.showStartScreen = true;

        this.camera_x = 0;

        this.draw();

    }


    pauseGame() {

        this.paused = true;

    }


    resumeGame() {

        this.paused = false;

    }


    togglePause() {

        this.paused = !this.paused;

    }

}