class World {

    canvas;
    ctx;
    startScreen = new Image();

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.startScreen.src = "img/9_intro_outro_screens/start/startscreen_1.png";

        this.startScreen.onload = () => {
            this.drawStartScreen();
        };
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
}