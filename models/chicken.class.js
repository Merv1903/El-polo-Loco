/**
 * Represents a small chicken enemy in the game.
 *
 * Extends MovableObject and provides walking, movement
 * and death behavior.
 */
class Chicken extends MovableObject {

    /**
     * Damage dealt to the character on collision.
     */
    damage = 50;


    /**
     * Images used for the walking animation.
     */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];


    /**
     * Image displayed when the chicken is dead.
     */
    IMAGE_DEAD =
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png";


    /**
     * Creates a new chicken.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     */
    constructor(x, y) {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.alive = true;

        this.speed = 0.3 + Math.random() * 0.4;

        this.animate();

    }


    /**
     * Starts the walking animation.
     *
     * Changes the displayed image every 150 milliseconds
     * while the chicken is alive.
     */
    animate() {

        setInterval(() => {

            if (this.alive) {

                this.playAnimation(this.IMAGES_WALKING);

            }

        }, 150);

    }


    /**
     * Moves the chicken to the left while it is alive.
     */
    move() {

        if (this.alive) {

            this.x -= this.speed;

        }

    }


    /**
     * Kills the chicken and displays its dead image.
     *
     * Marks the chicken for removal after 500 milliseconds.
     */
    die() {

        this.alive = false;

        this.loadImage(this.IMAGE_DEAD);

        setTimeout(() => {

            this.remove = true;

        }, 500);

    }

}