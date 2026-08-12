class Chicken extends MovableObject {

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    constructor(x, y) {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.animate();

    }

    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES_WALKING);

        }, 150);

    }

    move() {

        this.x -= 0.5;

    }

}