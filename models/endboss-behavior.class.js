Endboss.prototype.jump = function () {

    if (this.y !== 80) return;

    this.speedY = 30;

    // Richtung zu Pepe bestimmen
    if (this.world.character.x < this.x) {
        this.jumpDirection = -1;
        this.otherDirection = false;
    } else {
        this.jumpDirection = 1;
        this.otherDirection = true;
    }

    this.state = "jump";

    this.nextJumpTime =
        Date.now() + this.getRandomJumpDelay();

};


Endboss.prototype.moveJump = function () {

    if (this.jumpDirection === -1) {
        this.x -= 3;
    } else {
        this.x += 3;
    }

};


Endboss.prototype.getRandomJumpDelay = function () {

    return 3000 + Math.random() * 4000;

};


Endboss.prototype.move = function () {

    if (!this.alive) return;
    if (!this.world) return;

    if (this.state === "alert") return;
    if (this.state === "attack") return;

    if (this.state === "jump") {
        this.moveJump();
        return;
    }

    this.moveHorizontal();

};


Endboss.prototype.moveHorizontal = function () {

    if (this.world.character.x < this.x) {

        this.otherDirection = false;
        this.moveLeft();

    }

    if (this.world.character.x > this.x) {

        this.otherDirection = true;
        this.moveRight();

    }

};


Endboss.prototype.moveLeft = function () {

    this.x -= this.speed;

};


Endboss.prototype.moveRight = function () {

    this.x += this.speed;

};