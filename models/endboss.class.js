class Endboss extends MovableObject {

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

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
        this.loadImages(this.IMAGES_ALERT);

        this.x = x;
        this.y = y;

        this.world = world;

        this.width = 350;
        this.height = 350;

        this.energy = 100;
        this.damage = 20;

        this.alive = true;
        this.active = false;

        this.state = "walking";

        this.lastAnimation = 0;

        this.isHurt = false;

        this.otherDirection = false;

        this.speed = 0.2;

        setInterval(() => {
        
            this.speed = 0.2 + Math.random() * 0.6;
        
        }, 2000);

        this.alertFrame = 0;

        this.animate();

    }

    checkDistance() {

        const distance =
            Math.abs(this.x - this.world.character.x);
    
        if (distance > 700) {
    
            this.state = "walking";
            return;
    
        }
    
        if (distance > 300) {
    
            this.state = "alert";
            return;
    
        }
    
        this.state = "attack";
    
    }


    update() {

        this.checkDistance();
        this.move();
    
        const now = Date.now();
    
        if (now - this.lastAnimation >= 180) {
    
            this.animate();
            this.lastAnimation = now;
    
        }
    
    }


    animate() {

        if (!this.alive) return;
    
        if (this.isHurt) {
            this.playAnimation(this.IMAGES_HURT);
            return;
        }
    
        if (this.state === "alert") {
            this.playAnimation(this.IMAGES_ALERT);
            return;
        }
    
        this.playAnimation(this.IMAGES_WALKING);
    
    }

    
    move() {

        if (!this.alive) return;
    
        if (!this.world) return;
    
        const distance =
            Math.abs(this.x - this.world.character.x);

            this.active = distance < 700;

       
    
     if (distance < 700 && distance > 100) {
    
            if (this.world.character.x < this.x) {
    
                this.x -= this.speed;
                this.otherDirection = false;
    
            } else if (this.world.character.x > this.x) {
    
                this.x += this.speed;
                this.otherDirection = true;
    
            }
    
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