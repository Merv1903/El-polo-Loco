World.prototype.clearCanvas = function () {

    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


World.prototype.draw = function () {

    this.clearCanvas();

    if (this.showStartScreen) {

        this.drawStartScreen();
        return;

    }

    if (this.gameOver) {

        this.drawGameOver();
        return;

    }

    this.drawLevel();

    if (this.paused) {

        this.drawPauseOverlay();

    }

};


World.prototype.drawStartScreen = function () {

    this.ctx.drawImage(
        this.startScreen,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};

World.prototype.drawGameOver = function () {

    this.ctx.drawImage(
        this.gameOverScreen,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


World.prototype.drawLevel = function () {

    this.updateCamera();

    this.ctx.save();

    this.ctx.translate(this.camera_x, 0);

    this.drawBackground();
    this.drawCoins();
    this.drawBottles();
    this.drawThrowableBottles();
    this.drawEnemies();
    this.drawEndboss();
    this.drawCharacter();

    this.ctx.restore();

    this.drawStatusBar();
    this.drawCoinBar();
    this.drawBottleBar();

};


World.prototype.drawBackground = function () {

    this.level.backgrounds.forEach((background) => {

        background.draw(this.ctx);

    });

};


World.prototype.drawEnemies = function () {

    this.level.chickens.forEach((chicken) => {

        chicken.draw(this.ctx);

    });

};


World.prototype.drawEndboss = function () {

    if (!this.level.endboss.alive) return;

    this.level.endboss.draw(this.ctx);

};


World.prototype.drawCoins = function () {

    this.level.coins.forEach((coin) => {

        if (!coin.collected) {

            coin.draw(this.ctx);
            coin.drawHitbox(this.ctx);

        }

    });

};


World.prototype.drawBottles = function () {

    this.level.bottles.forEach((bottle) => {

        if (!bottle.collected) {

            bottle.draw(this.ctx);
            bottle.drawHitbox(this.ctx);

        }

    });

};


World.prototype.drawCharacter = function () {

    if (this.character.otherDirection) {

        this.drawFlippedCharacter();

    } else {

        this.character.draw(this.ctx);

    }

    this.character.drawHitbox(this.ctx);

};


World.prototype.drawFlippedCharacter = function () {

    this.ctx.save();

    this.ctx.translate(
        this.character.x + this.character.width,
        0
    );

    this.ctx.scale(-1, 1);

    this.ctx.drawImage(
        this.character.img,
        0,
        this.character.y,
        this.character.width,
        this.character.height
    );

    this.ctx.restore();

};


World.prototype.drawStatusBar = function () {

    this.statusBar.draw(this.ctx);

};


World.prototype.drawCoinBar = function () {

    this.coinBar.draw(this.ctx);

};


World.prototype.drawBottleBar = function () {

    this.bottleBar.draw(this.ctx);

};


World.prototype.drawPauseOverlay = function () {

    this.ctx.drawImage(
        this.pauseOverlay,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};

World.prototype.drawThrowableBottles = function () {

    this.throwableBottles.forEach((bottle) => {

        bottle.draw(this.ctx);

    });

};