class Endboss extends MovableObject {

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGE_ALERT =
        "img/4_enemie_boss_chicken/2_alert/G5.png";

    IMAGE_ATTACK =
        "img/4_enemie_boss_chicken/3_attack/G11.png";

    IMAGE_HURT =
        "img/4_enemie_boss_chicken/4_hurt/G21.png";

    IMAGE_DEAD =
        "img/4_enemie_boss_chicken/5_dead/G24.png";


    constructor(x, y) {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.y = y;

        this.world = world;

        this.width = 350;
        this.height = 350;

        this.energy = 100;
        this.damage = 20;

        this.alive = true;

        this.speed = 0.2;
        this.targetSpeed = 0.2;

        this.animate();

    }


    animate() {

        setInterval(() => {

            if (this.alive) {

                this.playAnimation(
                    this.IMAGES_WALKING
                );

            }

        }, 150);

    }

    move() {

        if (!this.alive) return;
    
        if (!this.world) return;
    
        const distance =
            Math.abs(this.x - this.world.character.x);
    
        if (distance < 700) {
    
            this.updateSpeed();
    
            this.x -= this.speed;
    
        }
    
    }

    changeSpeed() {

        this.targetSpeed =
            0.2 + Math.random() * 0.6;
    
    }

    updateSpeed() {

        if (this.speed < this.targetSpeed) {
    
            this.speed += 0.01;
    
        }
    
        if (this.speed > this.targetSpeed) {
    
            this.speed -= 0.01;
    
        }
    
    }

    die() {

        this.alive = false;

        this.loadImage(this.IMAGE_DEAD);

        setTimeout(() => {

            this.remove = true;

        }, 1000);

    }

    hit() {

        this.energy -= 10;
    
        if (this.energy <= 0) {
    
            this.energy = 0;
    
            this.die();
    
        }
    
    }

}