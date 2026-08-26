class Chicken extends MovableObject {

     damage = 50;


    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    IMAGE_DEAD =
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png";


    constructor(x, y) {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.alive = true;

        this.speed = 0.3 + Math.random() * 0.4;

        this.animate();

    }


    animate() {

        setInterval(() => {

            if (this.alive) {

                this.playAnimation(this.IMAGES_WALKING);

            }

        }, 150);

    }


    move() {

        if (this.alive) {

            this.x -= this.speed;

        }

    }


 die() {

    this.alive = false;

    this.loadImage(this.IMAGE_DEAD);

    setTimeout(() => {

        this.remove = true;

    }, 500);

}

}