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

        /**
     * Creates the game world and initializes all game objects.
     *
     * @param {HTMLCanvasElement} canvas - The game canvas.
     */

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


    /**
     * Loads the start, pause and game-over screens.
     */
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

    /**
     * Starts the game loop.
     */
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


    /**
     * Updates all active game objects and checks for collisions.
     */
    updateGame() {

        if (this.character.isDead) {
    
            this.updateCharacter();
    
            this.checkGameOver();
    
            return;
    
        }
    
        this.updateCharacter();
    
        this.updateEnemies();
    
        this.activateEndboss();
    
        this.level.endboss.update();
    
        this.updateThrowableBottles();
    
        this.removeThrowableBottles();
    
        this.checkEnemyCollisions();
    
        this.checkEndbossCharacterCollision();
    
        this.checkBottleCollisions();
    
        this.checkEndbossCollision();
    
        this.collectItems();
    
    }

/**
 * Activates the endboss when Pepe reaches the boss area.
 */
    activateEndboss() {

        if (
            !this.level.endboss.active &&
            this.character.x >= 2200
        ) {
    
            this.level.endboss.active = true;
    
        }
    
    }


   /**
     * Updates Pepe's movement and animation.
     */
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


  /**
     * Updates all chickens and removes defeated enemies.
     */    
    updateEnemies() {

        this.level.chickens.forEach((chicken) => {

            chicken.move();

        });

        this.removeDeadEnemies();

    }

    
 /**
     * Updates all throwable bottles.
     */
    updateThrowableBottles() {

        this.throwableBottles.forEach((bottle) => {
    
            bottle.move();
    
        });
    
    }

      /**
     * Removes bottles that are marked for removal.
     */
    removeThrowableBottles() {

        this.throwableBottles =
            this.throwableBottles.filter(
                (bottle) => !bottle.remove
            );
    
    }

  /**
     * Removes chickens that are marked for removal.
     */
    removeDeadEnemies() {

        this.level.chickens =
            this.level.chickens.filter(
                (chicken) => !chicken.remove
            );

    }

   /**
     * Resets the level and all game objects.
     */
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

    /**
     * Resets the game state and stops active sounds and screens.
     */
    resetGameState() {

        this.victoryScreen.stop();

        stopGameSounds();

        hideGameOverMenu();

        this.resetLevel();

    }


    /**
     * Returns to the main menu and resets the game.
     */
    backToMenu() {

        this.resetGameState();

        this.showStartScreen = true;

        playMenuMusic();

        this.draw();

        document.getElementById("menu").style.display = "flex";
        document.getElementById("game-controls").classList.remove("game-active");

    }


    /**
     * Starts a new game level.
     */
    startLevel() {

        this.resetGameState();

        this.showStartScreen = false;
        this.gameOver = false;
        this.camera_x = 0;

        document.getElementById("menu").style.display = "none";
        document.getElementById("game-controls").classList.add("game-active");    

        playLevelMusic();

        this.run();

    }


    /**
     * Stops the game loop.
     */
    stopLevel() {

        this.gameRunning = false;

        clearInterval(this.gameLoop);

    }


    /**
     * Pauses the game.
     */
    pauseGame() {

        this.paused = true;

    }


    /**
     * Resumes the game.
     */
    resumeGame() {

        this.paused = false;

    }


    /**
     * Toggles the paused state of the game.
     */
    togglePause() {

        this.paused = !this.paused;

    }


    /**
     * Ends the level and starts the victory screen.
     */
    winGame() {

        this.stopLevel();
        stopMusic();

        this.gameWon = true;

        document.getElementById("game-controls").classList.remove("game-active");    

        this.victoryScreen.start();

        showGameOverMenu();
        playVictorySound();

    }




}