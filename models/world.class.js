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
    this.character = new Character(keyboard, this);
    this.statusBar = new StatusBar();
this.coinBar = new CoinBar();
this.bottleBar = new BottleBar();

    this.startScreen.src = "img/9_intro_outro_screens/start/startscreen_1.png";
    this.pauseOverlay.src = "img/9_intro_outro_screens/start/controls_overlay.png";

    this.startScreen.onload = () => {
      this.draw();
    };
  }

  run() {

    if (this.gameRunning) return;

    this.gameRunning = true;

    this.gameLoop = setInterval(() => {

        if (!this.paused) {

            this.updateCharacter();

        }

        this.draw();

    }, 1000 / 60);

}

updateCharacter() {

    this.character.move();
    this.updateEnemies();
    this.checkEnemyCollisions();
    this.collectItems();

    const now = Date.now();

    if (now - this.lastAnimation >= 180) {

        this.character.animate();

        this.lastAnimation = now;

    }

}
updateEnemies() {

    this.level.chickens.forEach((chicken) => {

        chicken.move();

    });

}

checkEnemyCollisions() {

    this.level.chickens.forEach((chicken) => {

        if (this.character.isColliding(chicken)) {

            this.character.energy -= 20;

            this.statusBar.setPercentage(
                this.character.energy
            );

        }

    });

}

collectItems() {

    this.collect(this.level.coins, "coins");
    this.collect(this.level.bottles, "bottles");

}

collect(items, property) {

    items.forEach((item) => {

        if (!item.collected && this.character.isColliding(item)) {

            item.collected = true;
            this.character[property]++;

            if (property === "coins") {

                this.coinBar.setPercentage(
                    this.character.coins * 10
                );

            }

            if (property === "bottles") {

                this.bottleBar.setPercentage(
                    this.character.bottles * 10
                );

            }

        }

    });

}

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

draw() {
    this.clearCanvas();

    if (this.showStartScreen) {
        this.drawStartScreen();
    } else {
        this.drawLevel();

        if (this.paused) {
            this.drawPauseOverlay();
        }
    }
}

  drawStartScreen() {
    this.ctx.drawImage(
      this.startScreen,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  }

drawLevel() {

    this.updateCamera();

    this.ctx.save();

    this.ctx.translate(this.camera_x, 0);

    this.drawBackground();
    this.drawCoins();
    this.drawBottles();
    this.drawEnemies();
    this.drawCharacter();

    this.ctx.restore();

    this.drawStatusBar();
    this.drawCoinBar();
    this.drawBottleBar();

}

updateCamera() {

    this.camera_x = -this.character.x + 100;

    this.checkCameraLimits();

}

checkCameraLimits() {

    // linke Grenze
    if (this.camera_x > 0) {

        this.camera_x = 0;

    }


    // rechte Grenze
    if (this.camera_x < -(this.level.level_end_x - this.canvas.width)) {

        this.camera_x = -(this.level.level_end_x - this.canvas.width);

    }

}




  drawBackground() {
    this.level.backgrounds.forEach((background) => {
      background.draw(this.ctx);
    });
  }

  drawEnemies() {

    this.level.chickens.forEach((chicken) => {
        chicken.draw(this.ctx);
    });

}

drawCoins() {

    this.level.coins.forEach((coin) => {

        if (!coin.collected) {

            coin.draw(this.ctx);
            coin.drawHitbox(this.ctx);

        }

    });

}

drawBottles() {

    this.level.bottles.forEach((bottle) => {

        if (!bottle.collected) {

            bottle.draw(this.ctx);
            bottle.drawHitbox(this.ctx);

        }

    });

}

drawCharacter() {

    if (this.character.otherDirection) {

        this.drawFlippedCharacter();

    } else {

        this.character.draw(this.ctx);

    }

    this.character.drawHitbox(this.ctx);

}

  drawStatusBar() {

    this.statusBar.draw(this.ctx);

}

drawCoinBar() {

    this.coinBar.draw(this.ctx);

}

drawBottleBar() {

    this.bottleBar.draw(this.ctx);

}

  drawFlippedCharacter() {
    this.ctx.save();

    this.ctx.translate(this.character.x + this.character.width, 0);

    this.ctx.scale(-1, 1);

    this.ctx.drawImage(
      this.character.img,
      0,
      this.character.y,
      this.character.width,
      this.character.height,
    );

    this.ctx.restore();
  }

startLevel() {

    this.showStartScreen = false;

    this.camera_x = 0;

    console.log("START LEVEL:", this.showStartScreen);

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

drawPauseOverlay() {
    this.ctx.drawImage(
        this.pauseOverlay,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );
}
}
