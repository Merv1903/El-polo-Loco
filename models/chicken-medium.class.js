/**
 * Represents a medium-sized chicken enemy in the game.
 *
 * Extends Chicken with different walking and death images,
 * a larger size and adjusted damage.
 */
class ChickenMedium extends Chicken {

    /**
     * Images used for the medium chicken's walking animation.
     */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];


    /**
     * Image displayed when the medium chicken is dead.
     */
    IMAGE_DEAD =
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";


    /**
     * Creates a new medium chicken.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     */
    constructor(x, y) {

        super(x, y);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);

        this.width = 70;
        this.height = 70;

        this.damage = 20;
    }

}