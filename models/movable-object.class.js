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


offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};


getHitbox() {

    return {
        x: this.x + this.offset.left,
        y: this.y + this.offset.top,
        width: this.width - this.offset.left - this.offset.right,
        height: this.height - this.offset.top - this.offset.bottom
    };

}


isColliding(object) {

    const thisHitbox = this.getHitbox();
    const objectHitbox = object.getHitbox();

    return thisHitbox.x + thisHitbox.width > objectHitbox.x &&
           thisHitbox.y + thisHitbox.height > objectHitbox.y &&
           thisHitbox.x < objectHitbox.x + objectHitbox.width &&
           thisHitbox.y < objectHitbox.y + objectHitbox.height;

}


drawHitbox(ctx) {

    const hitbox = this.getHitbox();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        hitbox.x,
        hitbox.y,
        hitbox.width,
        hitbox.height
    );

}

}