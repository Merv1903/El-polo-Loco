class VictoryScreen {

    canvas;
    ctx;

    danceImages = [];

    danceFrame = 0;
    lastDanceFrame = 0;

    danceFrameDelay = 220;

    confetti = [];

    animationId = null;


    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.loadDanceImages();

        this.createConfetti();

    }


    loadDanceImages() {

        for (let i = 1; i <= 12; i++) {

            const image = new Image();

            image.src =
                `img/You won, you lost/victory_dance_${i}.png`;

            this.danceImages.push(image);

        }

    }


    start() {

        this.danceFrame = 0;
        this.lastDanceFrame = Date.now();

        this.createConfetti();

        this.animate();

    }


    stop() {

        if (this.animationId) {

            cancelAnimationFrame(this.animationId);

            this.animationId = null;

        }

    }


    animate() {

        this.updateDance();
    
        this.updateConfetti();
    
        this.clearAnimationArea();
    
        this.drawPepe();
    
        this.drawConfetti();
    
        this.animationId =
            requestAnimationFrame(() => this.animate());
    
    }


    updateDance() {

        const now = Date.now();

        if (
            now - this.lastDanceFrame <
            this.danceFrameDelay
        ) {

            return;

        }

        this.danceFrame++;

        if (
            this.danceFrame >=
            this.danceImages.length
        ) {

            this.danceFrame = 0;

        }

        this.lastDanceFrame = now;

    }


    clearAnimationArea() {

        const width = 180;
        const height = 180;
    
        const x =
            (this.canvas.width - width) / 2;
    
        const y =
            this.canvas.height - height - 120;
    
        this.ctx.clearRect(
            x - 10,
            y - 10,
            width + 20,
            height + 20
        );
    
    }


    drawPepe() {

        const image =
            this.danceImages[this.danceFrame];

        if (!image || !image.complete) return;


        const width = 180;
        const height = 180;
        
        const x =
            (this.canvas.width - width) / 2;
        
        const y =
            this.canvas.height - height - 120;


        this.ctx.drawImage(
            image,
            x,
            y,
            width,
            height
        );

    }


    createConfetti() {
        this.confetti = [];
    
        for (let i = 40; i--;) {
            this.confetti.push({
                x: this.canvas.width / 2,
                y: this.canvas.height - 180,
                size: 5,
                speed: 2 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 5
            });
        }
    }

    updateConfetti() {
        this.confetti.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
        });
    }

    drawConfetti() {

        const colors = [
            "#ff0000",
            "#00aaff",
            "#ffff00",
            "#00cc44",
            "#ff66cc",
            "#ff8800",
            "#ffffff"
        ];


        this.confetti.forEach((piece) => {

            this.ctx.save();

            this.ctx.translate(
                piece.x,
                piece.y
            );

            this.ctx.rotate(
                piece.rotation
            );


            this.ctx.fillStyle =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            this.ctx.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size
            );


            this.ctx.restore();

        });

    }

}