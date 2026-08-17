World.prototype.checkEnemyCollisions = function () {

    this.level.chickens.forEach((chicken) => {

        if (!chicken.alive) return;

        if (!this.character.isColliding(chicken)) return;

        this.handleChickenCollision(chicken);

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

    this.character.energy -= chicken.damage;

    this.character.hurt();

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