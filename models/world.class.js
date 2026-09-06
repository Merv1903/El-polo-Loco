class World {

    canvas;
    ctx;

    gameRunning = false;
    paused = false;
    gameOver = false;

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

        this.level = new Level();

        this.level.endboss.world = this;

        this.character =
            new Character(keyboard, this);

            

        this.throwableBottles = [];
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

        this.gameOverScreen.src =
            "img/9_intro_outro_screens/game_over/oh no you lost!.png";


        this.startScreen.onload = () => {

            this.draw();

        };


        this.gameOverScreen.onload = () => {

            console.log("Game Over Bild geladen");

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

        this.level.endboss.move();

        this.updateThrowableBottles();

        this.removeThrowableBottles();

        this.checkEnemyCollisions();

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

        this.camera_x = 0;

        this.gameOver = false;

    }


    startLevel() {

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


    checkGameOver() {

        if (
            this.gameOver ||
            !this.character.deadAnimationFinished
        ) {

            return;

        }

        this.gameOver = true;

        this.showGameOverScreen();

    }


    showGameOverScreen() {

        this.stopLevel();
    
        stopMusic();
    
        document.getElementById("game-controls").style.display = "none";
    
        this.drawGameOverScreen();
    
        showGameOverMenu();
    
        playGameOverSound();
    
    }


    drawGameOverScreen() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.drawImage(
            this.gameOverScreen,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

}