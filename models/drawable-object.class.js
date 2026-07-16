class DrawableObject {

    x = 0;
    y = 0;
    width = 0;
    height = 0;

    img;

    loadImage(path) {

        this.img = new Image();
        this.img.src = path;

    }

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