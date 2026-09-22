/**
 * Checks whether the character's death animation has finished
 * and triggers the game-over screen.
 */
World.prototype.checkGameOver = function () {
  if (this.gameOver || !this.character.deadAnimationFinished) {
    return;
  }
  this.gameOver = true;
  this.showGameOverScreen();
};

/**
 * Stops the level, hides the game controls and displays
 * the game-over screen and menu.
 */
World.prototype.showGameOverScreen = function () {
  this.stopLevel();
  stopMusic();
  document.getElementById("game-controls").classList.remove("game-active");
  this.drawGameOverScreen();
  showGameOverMenu();
  playGameOverSound();
};

/**
 * Clears the canvas and draws the game-over screen.
 */
World.prototype.drawGameOverScreen = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.drawImage(
    this.gameOverScreen,
    0,
    0,
    this.canvas.width,
    this.canvas.height,
  );
};
