class ThrowableBottle extends MovableObject {

    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/6_bottle_splash.png"
    ];


    constructor(x, y, direction) {

        super();

        this.loadImage(this.IMAGES_ROTATION[0]);

        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.speedX = direction ? -10 : 10;
        this.speedY = 5;

        this.rotationFrame = 0;
        this.lastRotation = 0;

        this.splash = false;
        this.splashFrame = 0;

    }


    move() {

        if (this.splash) return;

        this.x += this.speedX;

        this.y -= this.speedY;

        this.speedY -= 0.5;

        this.rotate();

    }


    rotate() {

        const now = Date.now();

        if (now - this.lastRotation < 100) return;

        this.lastRotation = now;

        this.rotationFrame++;

        if (this.rotationFrame >= this.IMAGES_ROTATION.length) {

            this.rotationFrame = 0;

        }

        this.loadImage(
            this.IMAGES_ROTATION[this.rotationFrame]
        );

    }

}