/**
 * Represents a collectible salsa bottle on the ground.
 *
 * Extends CollectableObject and provides the bottle image.
 */
class Bottle extends CollectableObject {

    /**
     * Creates a new bottle.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     */
    constructor(x, y) {

        super(x, y);

        this.loadImage(
            "img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
        );

    }

}