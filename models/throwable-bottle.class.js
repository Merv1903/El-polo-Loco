/**
 * Represents a throwable salsa bottle.
 *
 * The bottle can fly through the level, rotate while flying
 * and play a splash animation when it hits the ground or an enemy.
 */
class ThrowableBottle extends MovableObject {

    /**
     * Images used for the bottle rotation animation.
     */
    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    /**
     * Images used for the bottle splash animation.
     */
    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];


    /**
     * Creates a throwable bottle.
     *
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     * @param {boolean} direction - Determines the throwing direction.
     */
    constructor(x, y, direction) {

        super();

        this.loadImage(this.IMAGES_ROTATION[0]);

        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;

        this.width = 52;
        this.height = 52;

        this.speedX = direction ? -10 : 10;
        this.speedY = 12;

        this.rotationFrame = 0;
        this.lastRotation = 0;

        this.splash = false;
        this.splashFrame = 0;

    }


    /**
     * Checks whether the bottle has reached the ground.
     *
     * When the ground is reached, the bottle is positioned
     * on the ground and the splash animation is started.
     */
    checkGround() {

        if (this.y + this.height >= 420) {
    
            this.y = 420 - this.height;
    
            this.startSplash();
    
        }
    
    }


    /**
     * Moves the bottle through the air.
     *
     * The bottle stops moving once the splash animation has started.
     * Gravity continuously reduces the vertical speed.
     */
    move() {

        if (this.splash) return;
    
        this.x += this.speedX;
        this.y -= this.speedY;
    
        this.speedY -= 1;
    
        this.rotate();
        this.checkGround();
    
    }


    /**
     * Updates the bottle's rotation animation.
     *
     * A new rotation frame is displayed every 100 milliseconds.
     */
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


    /**
     * Starts the splash animation.
     *
     * The bottle stops flying and begins with the first
     * splash animation frame.
     */
    startSplash() {

        this.splash = true;
        this.splashFrame = 0;
    
        this.loadSplashImage();
    
        this.playSplashAnimation();
    
    }


    /**
     * Loads the current splash animation frame.
     */
    loadSplashImage() {

        this.loadImage(
            this.IMAGES_SPLASH[this.splashFrame]
        );
    
    }


    /**
     * Plays the splash animation frame by frame.
     *
     * After the last frame, the bottle is marked for removal.
     */
    playSplashAnimation() {

        const splashInterval = setInterval(() => {
    
            this.splashFrame++;
    
            if (this.splashFrame >= this.IMAGES_SPLASH.length) {
    
                clearInterval(splashInterval);
                this.remove = true;
    
                return;
    
            }
    
            this.loadSplashImage();
    
        }, 100);
    
    }


}