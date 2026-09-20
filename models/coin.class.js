/**
 * Represents a collectible coin in the game.
 *
 * Extends CollectableObject and provides a looping
 * coin animation.
 */
class Coin extends CollectableObject {

    /**
     * Images used for the coin animation.
     */
    IMAGES = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];


    /**
     * Creates a new coin.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     */
    constructor(x, y) {

        super(x, y);

            this.offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };


        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.animate();

    }


    /**
     * Starts the coin animation.
     *
     * Changes the displayed image every 200 milliseconds.
     */
    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES);

        }, 200);

    }

}