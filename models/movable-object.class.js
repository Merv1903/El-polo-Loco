/**
 * Represents a movable game object.
 *
 * Provides movement, jumping, gravity and collision detection.
 */
class MovableObject extends DrawableObject {
  speed = 5;
  speedY = 0;
  acceleration = 2.5;
  otherDirection = false;

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Applies gravity to the object at regular intervals.
   *
   * The object moves upward or downward depending on its
   * current vertical speed.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is currently above the ground.
   *
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    return this.y < 180;
  }

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Calculates the adjusted hitbox of the object.
   *
   * @returns {Object} The position and dimensions of the hitbox.
   */
  getHitbox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  /**
   * Checks whether this object is colliding with another object.
   *
   * @param {MovableObject} object - Object to check for collision.
   * @returns {boolean} True if the two hitboxes overlap.
   */
  isColliding(object) {
    const thisHitbox = this.getHitbox();
    const objectHitbox = object.getHitbox();

    return (
      thisHitbox.x + thisHitbox.width > objectHitbox.x &&
      thisHitbox.y + thisHitbox.height > objectHitbox.y &&
      thisHitbox.x < objectHitbox.x + objectHitbox.width &&
      thisHitbox.y < objectHitbox.y + objectHitbox.height
    );
  }

  /**
   * Draws the object's hitbox for debugging purposes.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  drawHitbox(ctx) {
    const hitbox = this.getHitbox();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
  }
}
