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
    
        this.drawWinScreen();
    
        this.animate();
    
    }


    stop() {

        if (this.animationId) {

            cancelAnimationFrame(this.animationId);

            this.animationId = null;

        }

    }





drawWinScreen() {
    this.clearWinScreen();
    this.drawWinTitle();
}


clearWinScreen() {
    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );
}



drawWinTitle() {
    this.drawWinShadow();
    this.drawWinText();
}

drawWinShadow() {

    const x = this.canvas.width / 2;
    const y = 140;

    this.ctx.font = "bold 120px Arial Black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillStyle = "#8b2d16";

    this.ctx.fillText(
        "YOU WON!",
        x + 8,
        y + 8
    );
}


drawWinText() {

    const x = this.canvas.width / 2;
    const y = 140;

    const gradient = this.ctx.createLinearGradient(
        0,
        y - 50,
        0,
        y + 50
    );

    gradient.addColorStop(0, "#ffd928");
    gradient.addColorStop(1, "#ff9d00");

    this.ctx.fillStyle = gradient;
    this.ctx.strokeStyle = "#c74618";
    this.ctx.lineWidth = 5;

    this.ctx.strokeText("YOU WON!", x, y);
    this.ctx.fillText("YOU WON!", x, y);
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
            this.canvas.height - height - 110;
    
        this.ctx.clearRect(
            x - 10,
            y - 10,
            width + 20,
            height + 20
        );
    
    }


    drawPepe() {

        const image =
            this.getCurrentDanceImage();
    
        if (!image) return;
    
        const position =
            this.getPepePosition();
    
        this.ctx.drawImage(
            image,
            position.x,
            position.y,
            position.width,
            position.height
        );
    
    }

    getCurrentDanceImage() {

        const image =
            this.danceImages[this.danceFrame];
    
        if (!image || !image.complete) return null;
    
        return image;
    
    }

    getPepePosition() {

        const width = 180;
        const height = 180;
    
        const x =
            (this.canvas.width - width) / 2;
    
        const y =
            this.canvas.height - height - 110;
    
        return {
            x,
            y,
            width,
            height
        };
    
    }


    createConfetti() {
        this.confetti = [];
    
        for (let i = 40; i--;) {
            this.confetti.push({
                x: this.canvas.width / 2,
                y: this.canvas.height - 180,
                size: 5,
                speed: 2 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 5,
                rotation: Math.random() * Math.PI * 2
            });
        }
    }

    updateConfetti() {

        this.confetti.forEach(p => {
    
            p.y += p.speed;
            p.x += p.drift;
    
            p.rotation += 0.05;
    
        });
    
    }

    drawConfetti() {

        this.confetti.forEach(piece => {
    
            this.drawConfettiPiece(piece);
    
        });
    
    }


    drawConfettiPiece(piece) {

        this.prepareConfettiPiece(piece);
    
        this.ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size
        );
    
        this.ctx.restore();
    
    }


    prepareConfettiPiece(piece) {

        this.ctx.save();
    
        this.ctx.translate(
            piece.x,
            piece.y
        );
    
        this.ctx.rotate(
            piece.rotation
        );
    
        this.ctx.fillStyle =
            this.getConfettiColor();
    
    }

    getConfettiColor() {

        const colors = [
            "#ff0000",
            "#00aaff",
            "#ffff00",
            "#00cc44",
            "#ff66cc",
            "#ff8800",
            "#ffffff"
        ];
    
        return colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];
    
    }


}