Endboss.prototype.animateWithDelay = function () {

    const now = Date.now();

    if (now - this.lastAnimation < 180) return;

    this.animate();

    this.lastAnimation = now;

};


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


Endboss.prototype.playWalkingAnimation = function () {

    this.playAnimation(this.IMAGES_WALKING);

};


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


Endboss.prototype.playAttackAnimation = function () {

    const i = this.attackFrame;

    this.img =
        this.imageCache[this.IMAGES_ATTACK[i]];

    this.attackFrame++;

    if (this.attackFrame >= this.IMAGES_ATTACK.length) {

        this.attackFrame = 0;

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

    }

};


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