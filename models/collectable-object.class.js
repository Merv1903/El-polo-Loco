/**
 * Base class for collectible objects in the game.
 *
 * Extends MovableObject with a collected state and
 * a default size and position.
 */
class CollectableObject extends MovableObject {

    /**
     * Indicates whether the object has already been collected.
     */
    collected = false;


    /**
     * Creates a collectible object.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     */
    constructor(x, y) {

        super();

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 80;

    }

}