class World {
  canvas;
  ctx;

  gameRunning = false;
  paused = false;

  startScreen = new Image();
  pauseOverlay = new Image();

  level;
  character;

  showStartScreen = true;

  camera_x = 0;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.level = new Level();
    this.character = new Character(keyboard, this);

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

        this.draw();

    }, 1000 / 60);

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
    this.drawCharacter();

    this.ctx.restore();
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

  drawCharacter() {
    if (this.character.otherDirection) {
      this.drawFlippedCharacter();
      return;
    }

    this.character.draw(this.ctx);
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
