/**
 * Clears the entire game canvas before drawing the next frame.
 */
World.prototype.clearCanvas = function () {

    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


/**
 * Draws the current game state.
 *
 * Start screen, game-over screen and win state are handled separately.
 * During normal gameplay the level and UI elements are rendered.
 */
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

    if (this.gameWon) {
        return;
    }

    this.drawLevel();

    if (this.paused) {
        this.drawPauseOverlay();
    }
};


/**
 * Draws the start screen scaled to the current canvas size.
 */
World.prototype.drawStartScreen = function () {

    this.ctx.drawImage(
        this.startScreen,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


/**
 * Draws the game-over screen scaled to the current canvas size.
 */
World.prototype.drawGameOver = function () {

    this.ctx.drawImage(
        this.gameOverScreen,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


/**
 * Draws all visual elements of the current level.
 *
 * The camera is updated first and the level objects are drawn
 * relative to the camera position.
 */
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

    if (this.level.endboss.active) {
        this.drawEndbossBar();
    }

};


/**
 * Draws all background objects of the current level.
 */
World.prototype.drawBackground = function () {

    this.level.backgrounds.forEach((background) => {

        background.draw(this.ctx);

    });

};


/**
 * Draws all chickens that belong to the current level.
 */
World.prototype.drawEnemies = function () {

    this.level.chickens.forEach((chicken) => {

        chicken.draw(this.ctx);

    });

};


/**
 * Draws the endboss depending on its current direction.
 *
 * The boss is not drawn when it is neither alive nor in its
 * death animation.
 */
World.prototype.drawEndboss = function () {

    const boss = this.level.endboss;

    if (!boss.alive && !boss.isDead) return;

    if (boss.otherDirection) {

        this.drawFlippedEndboss();

    } else {

        boss.draw(this.ctx);

    }

};


/**
 * Draws the endboss mirrored horizontally.
 *
 * Canvas transformation is used so the boss can face
 * the opposite direction without changing its image.
 */
World.prototype.drawFlippedEndboss = function () {

    this.ctx.save();

    this.ctx.translate(
        this.level.endboss.x + this.level.endboss.width,
        0
    );

    this.ctx.scale(-1, 1);

    this.ctx.drawImage(
        this.level.endboss.img,
        0,
        this.level.endboss.y,
        this.level.endboss.width,
        this.level.endboss.height
    );

    this.ctx.restore();

};


/**
 * Draws all uncollected coins in the level.
 *
 * Hitboxes are also displayed for debugging.
 */
World.prototype.drawCoins = function () {

    this.level.coins.forEach((coin) => {

        if (!coin.collected) {

            coin.draw(this.ctx);
            coin.drawHitbox(this.ctx);

        }

    });

};


/**
 * Draws all uncollected bottles in the level.
 *
 * Hitboxes are also displayed for debugging.
 */
World.prototype.drawBottles = function () {

    this.level.bottles.forEach((bottle) => {

        if (!bottle.collected) {

            bottle.draw(this.ctx);
            bottle.drawHitbox(this.ctx);

        }

    });

};


/**
 * Draws Pepe according to his current direction.
 *
 * The character is mirrored when he is facing left.
 */
World.prototype.drawCharacter = function () {

    if (this.character.otherDirection) {

        this.drawFlippedCharacter();

    } else {

        this.character.draw(this.ctx);

    }

    this.character.drawHitbox(this.ctx);

};


/**
 * Draws Pepe mirrored horizontally.
 *
 * Canvas transformation is used instead of modifying
 * the character images themselves.
 */
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


/**
 * Draws Pepe's health/status bar.
 */
World.prototype.drawStatusBar = function () {

    this.statusBar.draw(this.ctx);

};


/**
 * Draws the collected coin counter.
 */
World.prototype.drawCoinBar = function () {

    this.coinBar.draw(this.ctx);

};


/**
 * Draws the collected bottle counter.
 */
World.prototype.drawBottleBar = function () {

    this.bottleBar.draw(this.ctx);

};


/**
 * Draws the endboss health bar.
 *
 * The bar is only called when the endboss is active.
 */
World.prototype.drawEndbossBar = function () {

    this.endbossBar.draw(this.ctx);

};


/**
 * Draws the pause overlay over the current game scene.
 */
World.prototype.drawPauseOverlay = function () {

    this.ctx.drawImage(
        this.pauseOverlay,
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

};


/**
 * Draws all currently thrown bottles.
 *
 * Throwable bottles are stored separately from
 * the collectible bottles on the ground.
 */
World.prototype.drawThrowableBottles = function () {

    this.throwableBottles.forEach((bottle) => {

        bottle.draw(this.ctx);

    });

};