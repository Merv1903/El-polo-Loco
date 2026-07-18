class MovableObject extends DrawableObject {

    speed = 5;

    speedY = 0;

    acceleration = 2.5;

    otherDirection = false;

    moveRight() {

        this.x += this.speed;

    }

    moveLeft() {

        this.x -= this.speed;

    }

    jump() {

        this.speedY = 30;

    }

    applyGravity() {

        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;

                this.speedY -= this.acceleration;

            }

        }, 1000 / 25);

    }

    isAboveGround() {

        return this.y < 180;

    }

}