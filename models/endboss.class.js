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

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];
    
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    constructor(x, y) {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

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

        this.speed = 0.8;
        this.speedY = 0;
        this.acceleration = 2.5;

        setInterval(() => {

            this.speed = 0.8 + Math.random() * 0.7;

        }, 2000);

       
        this.alertFrame = 0;
        this.attackFrame = 0;
        this.hurtFrame = 0;
        this.deadFrame = 0;
        this.nextJumpTime = Date.now() + this.getRandomJumpDelay();

        this.animate();
        this.applyGravity();

    }


    applyGravity() {

        setInterval(() => {
    
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
    
            if (this.y >= 80) {

                this.y = 80;
                this.speedY = 0;
            
                if (this.state === "jump") {
                    this.state = "walking";
                }
            
            }
    
        }, 1000 / 25);
    }

    jump() {

        if (this.y !== 80) return;
    
        this.speedY = 30;
    
        // Richtung zu Pepe bestimmen
        if (this.world.character.x < this.x) {
            this.jumpDirection = -1;
            this.otherDirection = false;
        } else {
            this.jumpDirection = 1;
            this.otherDirection = true;
        }
    
        this.state = "jump";
    
        this.nextJumpTime =
            Date.now() + this.getRandomJumpDelay();
    
    }


    moveJump() {

        if (this.jumpDirection === -1) {
            this.x -= 3;
        } else {
            this.x += 3;
        }
    
    }

    getRandomJumpDelay() {

        return 3000 + Math.random() * 4000;
    
    }

    update() {

        this.checkDistance();
    
        if (
            Date.now() >= this.nextJumpTime &&
            this.state === "walking"
        ) {
            this.jump();
        }
    
        this.move();
        this.animateWithDelay();
    
    }

    checkDistance() {

        if (this.state === "alert") return;
    
        const distance =
            Math.abs(this.x - this.world.character.x);
    
        this.handleDistance(distance);
    }
    

    handleDistance(distance) {

        console.log("STATE VORHER:", this.state, "DISTANZ:", distance);

        if (this.isTooFar(distance)) {
            this.resetDetection();
            return;
        }
    
        if (this.shouldAttack(distance)) {
            this.state = "attack";
            return;
        }
    
        if (this.shouldAlert(distance)) {
            this.startAlert();
            return;
        }
    
        if (this.hasSeenCharacter) return;

this.state = "walking";
    }


    isTooFar(distance) {
        return distance > 1000;
    }

    
    resetDetection() {
        this.hasSeenCharacter = false;
        this.state = "walking";
    }


    shouldAlert(distance) {
        return !this.hasSeenCharacter && distance <= 700;
    }
    
    startAlert() {
        this.state = "alert";
        this.hasSeenCharacter = true;
        this.alertFinished = false;
        this.alertFrame = 0;
    }

    shouldAttack(distance) {
        return distance <= 50;
    }

    move() {

        if (!this.alive) return;
        if (!this.world) return;
    
        if (this.state === "alert") return;
        if (this.state === "attack") return;
    
        if (this.state === "jump") {
            this.moveJump();
            return;
        }
    
        this.moveHorizontal();
    
    }

    moveHorizontal() {

        if (this.world.character.x < this.x) {

            this.otherDirection = false;
            this.moveLeft();

        }

        if (this.world.character.x > this.x) {

            this.otherDirection = true;
            this.moveRight();

        }

    }


    moveLeft() {

        this.x -= this.speed;

    }


    moveRight() {

        this.x += this.speed;

    }


    animateWithDelay() {

        const now = Date.now();

        if (now - this.lastAnimation < 180) return;

        this.animate();

        this.lastAnimation = now;

    }


    animate() {

        if (this.isDead) {
            this.playDeadAnimation();
            return;
        }
    
        if (this.isHurt) {
    
            this.playHurtAnimation();
            return;
    
        }
    
        if (this.state === "walking") {
    
            this.playWalkingAnimation();
            return;
    
        }
    
        if (this.state === "alert") {
    
            this.playAlertAnimation();
            return;
    
        }
    
        if (this.state === "attack") {
    
            this.playAttackAnimation();
            return;
    
        }
    
    }

    playWalkingAnimation() {

        this.playAnimation(this.IMAGES_WALKING);

    }


    playAlertAnimation() {

        const i = this.alertFrame;
    
        this.img = this.imageCache[this.IMAGES_ALERT[i]];
    
        this.alertFrame++;
    
        if (this.alertFrame >= this.IMAGES_ALERT.length) {
            this.alertFrame = 0;
            this.state = "walking";
        }
    
    }


    playAttackAnimation() {

        const i = this.attackFrame;
    
        this.img = this.imageCache[this.IMAGES_ATTACK[i]];
    
        this.attackFrame++;
    
        if (this.attackFrame >= this.IMAGES_ATTACK.length) {
    
            this.attackFrame = 0;
    
            const distance =
                Math.abs(this.x - this.world.character.x);
    
            if (distance <= 50) {
                this.state = "attack";
            } else {
                this.state = "walking";
            }
        }
    }

    playHurtAnimation() {

        const i = this.hurtFrame;
    
        this.img = this.imageCache[this.IMAGES_HURT[i]];
    
        this.hurtFrame++;
    
        if (this.hurtFrame >= this.IMAGES_HURT.length) {
    
            this.hurtFrame = 0;
            this.isHurt = false;
    
        }
    
    }


    playDeadAnimation() {

        const i = this.deadFrame;
    
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
    
        this.deadFrame++;
    
        if (this.deadFrame >= this.IMAGES_DEAD.length) {
    
            this.deadFrame = this.IMAGES_DEAD.length - 1;
    
        }
    
    }


    hit() {

        this.energy -= 10;
    
        this.isHurt = true;
        this.hurtFrame = 0;
    
        this.world.endbossBar.setPercentage(this.energy);
    
        if (this.energy <= 0) {
    
            this.energy = 0;
    
            this.world.endbossBar.setPercentage(0);
    
            this.die();
    
        }
    
    }


    die() {

        if (!this.alive) return;
    
        this.alive = false;
        this.isDead = true;
        this.deadFrame = 0;
    
        setTimeout(() => {
    
            this.remove = true;
    
            this.world.winGame();
    
        }, 1000);
    
    }

}