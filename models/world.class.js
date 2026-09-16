class World {

    canvas;
    ctx;

    gameRunning = false;
    paused = false;
    gameOver = false;

    victoryScreen;

    lastAnimation = 0;

    startScreen = new Image();
    pauseOverlay = new Image();
    gameOverScreen = new Image();

    level;
    character;
    statusBar;
    coinBar;
    bottleBar;
    throwableBottles = [];

    showStartScreen = true;

    camera_x = 0;


    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.victoryScreen =
    new VictoryScreen(canvas);

        this.level = new Level();

        this.level.endboss.world = this;

        this.character =
            new Character(keyboard, this);

            

        this.throwableBottles = [];
        this.statusBar = new StatusBar();
        this.coinBar = new CoinBar();
        this.bottleBar = new BottleBar();
        this.endbossBar = new EndbossBar();

        this.loadScreens();

    }


    loadScreens() {

        this.startScreen.src =
            "img/9_intro_outro_screens/start/startscreen_1.png";
    
        this.pauseOverlay.src =
            "img/9_intro_outro_screens/start/controls_overlay.png";
    
        this.gameOverScreen.src =
            "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    
    
        this.startScreen.onload = () => {
    
            this.draw();
    
        };
    
    }


    run() {

        if (this.gameRunning) return;

        this.gameRunning = true;

        this.gameLoop = setInterval(() => {

            if (!this.paused && !this.gameOver) {

                this.updateGame();

            }

            this.draw();

        }, 1000 / 60);

    }


    updateGame() {

        if (this.character.isDead) {

            this.updateCharacter();

            this.checkGameOver();

            return;

        }

        this.updateCharacter();

        this.updateEnemies();

        if (
            !this.level.endboss.active &&
            this.character.x >= 2200
        ) {
            this.level.endboss.active = true;
        }

        this.level.endboss.update();

        this.updateThrowableBottles();

        this.removeThrowableBottles();

        this.checkEnemyCollisions();

        this.checkEndbossCharacterCollision();

        this.checkBottleCollisions();
        
        this.checkEndbossCollision();

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


    updateThrowableBottles() {

        this.throwableBottles.forEach((bottle) => {
    
            bottle.move();
    
        });
    
    }

    removeThrowableBottles() {

        this.throwableBottles =
            this.throwableBottles.filter(
                (bottle) => !bottle.remove
            );
    
    }


    removeDeadEnemies() {

        this.level.chickens =
            this.level.chickens.filter(
                (chicken) => !chicken.remove
            );

    }


    resetLevel() {

        this.level = new Level();

        this.character =
            new Character(keyboard, this);

        this.statusBar = new StatusBar();

        this.coinBar = new CoinBar();

        this.bottleBar = new BottleBar();

        this.endbossBar = new EndbossBar();

        this.camera_x = 0;

        this.gameOver = false;

        this.gameWon = false;

    }


    startLevel() {


        this.victoryScreen.stop();

        hideGameOverMenu();
    
        stopGameSounds();   // ← HIER
    
        this.resetLevel();
    
        this.showStartScreen = false;
        this.gameOver = false;
        this.camera_x = 0;
    
        document.getElementById("menu").style.display = "none";
        document.getElementById("game-controls").style.display = "flex";
    
        playLevelMusic();
    
        this.run();
    
    }

    stopLevel() {

        this.gameRunning = false;

        clearInterval(this.gameLoop);

    }


    backToMenu() {


        this.victoryScreen.stop();

        this.stopLevel();
    
        stopGameSounds();   // ← HIER
    
        hideGameOverMenu();
    
        this.resetLevel();
    
        this.showStartScreen = true;
    
        playMenuMusic();
    
        this.draw();
    
        document.getElementById("menu").style.display = "flex";
        document.getElementById("game-controls").style.display = "none";
    
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


    winGame() {

        this.stopLevel();
        stopMusic();
    
        this.gameWon = true;
    
        document.getElementById("game-controls").style.display = "none";
    
        this.victoryScreen.start();
    
        showGameOverMenu();
        playVictorySound();
    
    }



}