/**
 * Checks collisions between Pepe and all chickens.
 *
 * Dead chickens and collisions while Pepe is dead are ignored.
 */
World.prototype.checkEnemyCollisions = function () {

    if (this.character.isDead) return;

    this.level.chickens.forEach((chicken) => {

        if (!chicken.alive) return;
        if (!this.character.isColliding(chicken)) return;

        this.handleChickenCollision(chicken);

    });

};


/**
 * Checks whether Pepe collides with the endboss.
 *
 * The collision is only active while the boss is alive.
 */
World.prototype.checkEndbossCharacterCollision = function () {

    const boss = this.level.endboss;

    if (!boss.alive) return;

    if (!this.character.isColliding(boss)) return;

    this.hitCharacter(boss);

};


/**
 * Checks collisions between thrown bottles and chickens.
 *
 * A bottle starts its splash animation when it hits a chicken.
 */
World.prototype.checkBottleCollisions = function () {

    this.throwableBottles.forEach((bottle) => {

        if (bottle.splash) return;

        this.level.chickens.forEach((chicken) => {

            if (!chicken.alive) return;

            if (bottle.isColliding(chicken)) {

                chicken.die();

                bottle.startSplash();

            }

        });

    });

};


/**
 * Checks collisions between thrown bottles and the endboss.
 *
 * The boss takes damage and the bottle starts its splash animation
 * when a collision occurs.
 */
World.prototype.checkEndbossCollision = function () {

    const boss = this.level.endboss;

    if (!boss.alive) return;

    this.throwableBottles.forEach((bottle) => {

        if (bottle.splash) return;

        if (bottle.isColliding(boss)) {

            boss.hit();

            bottle.startSplash();

        }

    });

};


/**
 * Handles a collision between Pepe and a chicken.
 *
 * While Pepe is in the air, he does not take damage from chickens.
 * If Pepe is falling and reaches the chicken from above, the chicken
 * is killed and Pepe bounces upward.
 *
 * If Pepe collides with a chicken while on the ground,
 * he takes damage.
 *
 * @param {Chicken} chicken - The chicken involved in the collision.
 */
World.prototype.handleChickenCollision = function (chicken) {

    const character = this.character;


    if (character.isAboveGround()) {

        if (
            character.isFalling() &&
            character.y + character.height - character.offset.bottom
                <= chicken.y + 25
        ) {

            this.killChicken(chicken);

        }

        return;

    }


    this.hitCharacter(chicken);

};

/**
 * Kills a chicken when Pepe lands on it.
 *
 * Pepe receives an upward bounce and his jump animation
 * restarts from the first frame.
 *
 * @param {Chicken} chicken - The chicken Pepe lands on.
 */
World.prototype.killChicken = function (chicken) {

    chicken.die();

    this.character.speedY = 20;

    // Restart the jump animation for every bounce.
    this.character.currentImage = 0;
    this.character.currentAnimation = null;

    console.log("CHICKEN BOUNCE!");
    console.log("Jump animation reset to J-31");

};


/**
 * Applies damage to Pepe.
 *
 * Invincibility prevents repeated damage.
 * When energy reaches zero, Pepe dies.
 */
World.prototype.hitCharacter = function (chicken) {

    if (this.character.isInvincible) return;

    this.reduceCharacterEnergy(chicken.damage);

    if (this.character.energy === 0) {

        this.character.die();
        return;

    }

    this.character.hurt();

};


/**
 * Reduces Pepe's energy without allowing it to fall below zero.
 *
 * The health bar is updated after the damage is applied.
 */
World.prototype.reduceCharacterEnergy = function (damage) {

    const newEnergy =
        this.character.energy - damage;

    this.character.energy =
        Math.max(0, newEnergy);

    this.updateHealthBar();

};


/**
 * Updates Pepe's health bar to match his current energy.
 */
World.prototype.updateHealthBar = function () {

    this.statusBar.setPercentage(
        this.character.energy
    );

};


/**
 * Checks all collectible items in the current level.
 */
World.prototype.collectItems = function () {

    this.collect(this.level.coins, "coins");
    this.collect(this.level.bottles, "bottles");

};


/**
 * Checks whether Pepe collects an item.
 *
 * The collected item is marked and the corresponding
 * character counter and status bar are updated.
 */
World.prototype.collect = function (items, property) {

    items.forEach((item) => {

        if (
            !item.collected &&
            this.character.isColliding(item)
        ) {

            item.collected = true;

            this.character[property]++;

            this.updateItemBar(property);

        }

    });

};


/**
 * Updates the status bar for collected coins or bottles.
 *
 * Each collected item increases the corresponding bar by 10 percent.
 */
World.prototype.updateItemBar = function (property) {

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

};