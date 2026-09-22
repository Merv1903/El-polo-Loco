/**
 * Updates the horizontal camera position based on Pepe's position.
 *
 * The camera follows Pepe while respecting the level boundaries.
 */
World.prototype.updateCamera = function () {
  this.camera_x = -this.character.x + 100;

  this.checkCameraLimits();
};

/**
 * Keeps the camera inside the playable level area.
 *
 * The camera cannot move beyond the left or right edge of the level.
 */
World.prototype.checkCameraLimits = function () {
  if (this.camera_x > 0) {
    this.camera_x = 0;
  }

  if (this.camera_x < -(this.level.level_end_x - this.canvas.width)) {
    this.camera_x = -(this.level.level_end_x - this.canvas.width);
  }
};
