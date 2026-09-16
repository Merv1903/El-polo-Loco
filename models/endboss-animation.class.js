/**
 * Updates the endboss animation with a fixed frame delay.
 */
Endboss.prototype.animateWithDelay = function () {

    const now = Date.now();

    if (now - this.lastAnimation < 180) return;

    this.animate();

    this.lastAnimation = now;

};


/**
 * Selects and plays the animation that matches the current endboss state.
 */
Endboss.prototype.animate = function () {

    if (this.isDead) {
        this.playDeadAnimation();
        return;
    }

    if (this.isHurt) {
        this.playHurtAnimation();
        return;
    }

    if (this.state === "walking") {
        this.playWalkingAnimation();
        return;
    }

    if (this.state === "alert") {
        this.playAlertAnimation();
        return;
    }

    if (this.state === "attack") {
        this.playAttackAnimation();
        return;
    }

};


/**
 * Plays the walking animation of the endboss.
 */
Endboss.prototype.playWalkingAnimation = function () {

    this.playAnimation(this.IMAGES_WALKING);

};


/**
 * Plays the alert animation and returns to walking afterwards.
 */
Endboss.prototype.playAlertAnimation = function () {

    const i = this.alertFrame;

    this.img =
        this.imageCache[this.IMAGES_ALERT[i]];

    this.alertFrame++;

    if (this.alertFrame >= this.IMAGES_ALERT.length) {

        this.alertFrame = 0;
        this.state = "walking";

    }

};


/**
 * Plays the attack animation of the endboss.
 */
Endboss.prototype.playAttackAnimation = function () {

    const i = this.attackFrame;

    this.img =
        this.imageCache[this.IMAGES_ATTACK[i]];

    this.attackFrame++;

    this.finishAttackAnimation();

};


/**
 * Checks whether the attack animation has finished.
 * Resets the animation and determines the next state.
 */
Endboss.prototype.finishAttackAnimation = function () {

    if (this.attackFrame < this.IMAGES_ATTACK.length) {
        return;
    }

    this.attackFrame = 0;

    this.setAttackState();

};


/**
 * Determines whether the endboss should continue attacking Pepe.
 */
Endboss.prototype.setAttackState = function () {

    const distance =
        Math.abs(
            this.x -
            this.world.character.x
        );

    if (distance <= 50) {

        this.state = "attack";

    } else {

        this.state = "walking";

    }

};


/**
 * Plays the hurt animation of the endboss.
 */
Endboss.prototype.playHurtAnimation = function () {

    const i = this.hurtFrame;

    this.img =
        this.imageCache[this.IMAGES_HURT[i]];

    this.hurtFrame++;

    if (this.hurtFrame >= this.IMAGES_HURT.length) {

        this.hurtFrame = 0;
        this.isHurt = false;

    }

};


/**
 * Plays the death animation of the endboss.
 * Keeps the final frame visible after the animation finishes.
 */
Endboss.prototype.playDeadAnimation = function () {

    const i = this.deadFrame;

    this.img =
        this.imageCache[this.IMAGES_DEAD[i]];

    this.deadFrame++;

    if (this.deadFrame >= this.IMAGES_DEAD.length) {

        this.deadFrame =
            this.IMAGES_DEAD.length - 1;

    }

};