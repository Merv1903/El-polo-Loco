

class World {

    canvas;
    ctx;

    startScreen = new Image();

    level;

    showStartScreen = true;

    camera_x = 0;

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.level = new Level();

        this.startScreen.src =
            "img/9_intro_outro_screens/start/startscreen_1.png";

        this.startScreen.onload = () => {

            this.draw();

        };

    }

    draw() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        if (this.showStartScreen) {

            this.ctx.drawImage(
                this.startScreen,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

        } else {

      this.ctx.save();

this.ctx.translate(this.camera_x, 0);

this.level.backgrounds.forEach(background => {

    background.draw(this.ctx);

});

this.ctx.restore();

        }

    }

 startLevel() {

    this.showStartScreen = false;

    this.camera_x = -300;

    this.draw();

}

}