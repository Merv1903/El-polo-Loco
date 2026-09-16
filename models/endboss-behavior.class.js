/**
 * Starts a jump towards Pepe.
 *
 * The jump can only start when the endboss is standing
 * on the ground. The jump direction is determined by Pepe's position.
 */
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


/**
 * Moves the endboss horizontally while jumping.
 *
 * The direction is determined when the jump starts.
 */
Endboss.prototype.moveJump = function () {

    if (this.jumpDirection === -1) {
        this.x -= 3;
    } else {
        this.x += 3;
    }

};


/**
 * Generates a random delay until the next jump.
 *
 * @returns {number} Random delay between 3000 and 7000 milliseconds.
 */
Endboss.prototype.getRandomJumpDelay = function () {

    return 3000 + Math.random() * 4000;

};


/**
 * Moves the endboss according to its current state.
 *
 * The boss does not move while alerting or attacking.
 * During a jump, horizontal jump movement is used.
 */
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


/**
 * Moves the endboss horizontally towards Pepe.
 *
 * The boss direction is updated depending on Pepe's position.
 */
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


/**
 * Moves the endboss to the left by its current speed.
 */
Endboss.prototype.moveLeft = function () {

    this.x -= this.speed;

};


/**
 * Moves the endboss to the right by its current speed.
 */
Endboss.prototype.moveRight = function () {

    this.x += this.speed;

};