/**
 * Base class for all drawable objects in the game.
 *
 * Provides image loading, animation handling and drawing functionality.
 */
class DrawableObject {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  img;
  imageCache = {};
  currentImage = 0;
  currentAnimation = null;

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
    arr.forEach((path) => {
      let img = new Image();

      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation using the given image array.
   *
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImage = 0;
    }

    // Jump animation
    if (images === this.IMAGES_JUMP) {
      const i = Math.min(this.currentImage, images.length - 1);
      const path = images[i];

      this.img = this.imageCache[path];

      if (this.currentImage < images.length - 1) {
        this.currentImage++;
      }

      return;
    }

    // All other animations continue looping.
    const i = this.currentImage % images.length;

    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  /**
   * Draws the object on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
