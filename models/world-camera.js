World.prototype.updateCamera = function () {

    this.camera_x = -this.character.x + 100;

    this.checkCameraLimits();

};


World.prototype.checkCameraLimits = function () {

    if (this.camera_x > 0) {

        this.camera_x = 0;

    }

    if (
        this.camera_x <
        -(this.level.level_end_x - this.canvas.width)
    ) {

        this.camera_x =
            -(this.level.level_end_x - this.canvas.width);

    }

};