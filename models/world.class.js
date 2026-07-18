class World {

    canvas;
    ctx;

    startScreen = new Image();

    level;
    character;

    showStartScreen = true;

    camera_x = 0;

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.level = new Level();
this.character = new Character(keyboard);

        this.startScreen.src =
            "img/9_intro_outro_screens/start/startscreen_1.png";

        this.startScreen.onload = () => {

            this.draw();

        };

    }

    run() {

        setInterval(() => {

            this.draw();

        }, 1000 / 60);

    }

    clearCanvas() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    draw() {

        this.clearCanvas();

        if (this.showStartScreen) {

            this.drawStartScreen();

        } else {

            this.drawLevel();

        }

    }

    drawStartScreen() {

        this.ctx.drawImage(
            this.startScreen,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    drawLevel() {

        this.ctx.save();

        this.ctx.translate(this.camera_x, 0);

        this.drawBackground();
        this.drawCharacter();

        this.ctx.restore();

    }

    drawBackground() {

        this.level.backgrounds.forEach(background => {

            background.draw(this.ctx);

        });

    }

    drawCharacter() {

        this.character.draw(this.ctx);

    }

    startLevel() {

        this.showStartScreen = false;

        this.camera_x = 0;

        this.character.animate();

        this.run();

    }

}