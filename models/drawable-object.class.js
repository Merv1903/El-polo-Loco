class DrawableObject {

    x = 0;
    y = 0;
    width = 0;
    height = 0;

    img;

    imageCache = {};

currentImage = 0;

 loadImage(path) {

    this.img = new Image();

    this.img.onload = () => {
        console.log("Bild geladen:", path);
    };

    this.img.onerror = () => {
        console.error("Bild NICHT gefunden:", path);
    };

    this.img.src = path;
}

loadImages(arr) {

    arr.forEach(path => {

        let img = new Image();

        img.src = path;

        this.imageCache[path] = img;

    });

}

playAnimation(images) {

    let i = this.currentImage % images.length;

    let path = images[i];

    this.img = this.imageCache[path];

    this.currentImage++;

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