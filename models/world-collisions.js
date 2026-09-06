World.prototype.checkEnemyCollisions = function () {

    if (this.character.isDead) return;

    this.level.chickens.forEach((chicken) => {

        if (!chicken.alive) return;
        if (!this.character.isColliding(chicken)) return;

        this.handleChickenCollision(chicken);

    });

};

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


World.prototype.handleChickenCollision = function (chicken) {

    if (this.character.isFalling()) {

        this.killChicken(chicken);
        return;

    }

    this.hitCharacter(chicken);

};


World.prototype.killChicken = function (chicken) {

    chicken.die();

    this.character.speedY = 20;

};


World.prototype.hitCharacter = function (chicken) {

    if (this.character.isInvincible) return;

    this.reduceCharacterEnergy(chicken.damage);

    if (this.character.energy === 0) {

        this.character.die();
        return;

    }

    this.character.hurt();

};

World.prototype.reduceCharacterEnergy = function (damage) {

    const newEnergy =
        this.character.energy - damage;

    this.character.energy =
        Math.max(0, newEnergy);

    this.updateHealthBar();

};

World.prototype.updateHealthBar = function () {

    this.statusBar.setPercentage(
        this.character.energy
    );

};


World.prototype.collectItems = function () {

    this.collect(this.level.coins, "coins");
    this.collect(this.level.bottles, "bottles");

};


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