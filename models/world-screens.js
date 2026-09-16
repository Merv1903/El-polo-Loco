World.prototype.checkGameOver = function () {

    if (
        this.gameOver ||
        !this.character.deadAnimationFinished
    ) {
        return;
    }

    this.gameOver = true;

    this.showGameOverScreen();

};


World.prototype.showGameOverScreen = function () {

    this.stopLevel();

    stopMusic();

    document.getElementById("game-controls").style.display = "none";

    this.drawGameOverScreen();

    showGameOverMenu();

    playGameOverSound();

};


World.prototype.drawGameOverScreen = function () {

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

};