/**
 * Base class for all drawable objects in the game.
 *
 * Provides image loading, animation handling and drawing functionality.
 */
class DrawableObject {

    /**
     * Horizontal position of the object.
     */
    x = 0;

    /**
     * Vertical position of the object.
     */
    y = 0;

    /**
     * Width of the object.
     */
    width = 0;

    /**
     * Height of the object.
     */
    height = 0;

    /**
     * Currently displayed image.
     */
    img;

    /**
     * Stores all preloaded images of the object.
     */
    imageCache = {};

    /**
     * Index of the current animation frame.
     */
    currentImage = 0;


    /**
     * Loads a single image and sets it as the current image.
     *
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {

        this.img = new Image();

        this.img.src = path;

    }


    /**
     * Loads multiple images into the image cache.
     *
     * @param {string[]} arr - Array containing image paths.
     */
    loadImages(arr) {

        arr.forEach(path => {

            let img = new Image();

            img.src = path;

            this.imageCache[path] = img;

        });

    }


    /**
     * Plays the next frame of an animation.
     *
     * The animation loops back to the first frame
     * after reaching the end of the image array.
     *
     * @param {string[]} images - Array containing animation image paths.
     */
    playAnimation(images) {

        let i = this.currentImage % images.length;

        let path = images[i];

        this.img = this.imageCache[path];

        this.currentImage++;

    }


    /**
     * Draws the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );

    }

}