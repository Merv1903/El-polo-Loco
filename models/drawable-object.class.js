imageCache = {};

currentImage = 0;

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