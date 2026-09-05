class Character extends MovableObject {

    keyboard;
    world;
    otherDirection = false;

    energy = 100;
    coins = 0;
    bottles = 0;

    isHurt = false;
    isInvincible = false;
isDead = false;
deadFrame = 0;

    speedY = 0;
    acceleration = 2.5;


    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];


    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];


    IMAGES_JUMP = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png"
    ];


    IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
];

IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
];

    constructor(keyboard, world) {

        super();

        this.keyboard = keyboard;
        this.world = world;

        this.loadImage(this.IMAGES_IDLE[0]);

        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();

        this.x = 120;
        this.y = 180;

        this.width = 120;
        this.height = 250;

        this.offset = {
            top: 90,
            left: 30,
            right: 30,
            bottom: 20
        };

    }


animate() {

    if (this.world.paused) return;

    if (this.isDead) {

        this.playDeadAnimation();
        return;

    }

    if (this.isHurt) {

        this.playHurtAnimation();
        return;

    }

    this.playMovementAnimation();

}

playHurtAnimation() {

    this.playAnimation(this.IMAGES_HURT);

}

playDeadAnimation() {

    if (this.deadAnimationFinished) return;

    this.loadImage(this.IMAGES_DEAD[this.deadFrame]);

    if (this.deadFrame < this.IMAGES_DEAD.length - 1) {

        this.deadFrame++;

    } else {

        this.deadAnimationFinished = true;

    }

}

playMovementAnimation() {

    if (this.isAboveGround()) {

        this.playAnimation(this.IMAGES_JUMP);
        return;

    }

    if (this.keyboard.RIGHT || this.keyboard.LEFT) {

        this.playAnimation(this.IMAGES_WALKING);
        return;

    }

    this.playAnimation(this.IMAGES_IDLE);

}




move() {

    if (this.world.paused) return;

    if (this.isDead) return;

    this.moveHorizontal();
    this.handleJump();
    this.handleThrow();

}

moveHorizontal() {

    if (this.keyboard.RIGHT) {

        this.otherDirection = false;
        this.moveRight();

    }

    if (this.keyboard.LEFT) {

        this.otherDirection = true;
        this.moveLeft();

    }

}

moveRight() {

    if (this.x < this.world.level.level_end_x - this.width) {

        this.x += 5;

    }

}


moveLeft() {

    if (this.x > 0) {

        this.x -= 5;

    }

}


handleJump() {

    if (this.keyboard.SPACE) {

        this.jump();

        this.keyboard.SPACE = false;

    }

}

handleThrow() {

    if (this.keyboard.D) {

        this.throwBottle();

        this.keyboard.D = false;

    }

}

throwBottle() {

    if (this.bottles <= 0) return;

    const bottle = new ThrowableBottle(
        this.x + 60,
        this.y + 100,
        this.otherDirection
    );

    this.world.throwableBottles.push(bottle);

    this.bottles--;

    this.world.updateItemBar("bottles");

}

    isAboveGround() {

        return this.y < 180;

    }


    jump() {

        if (!this.isAboveGround()) {

            this.speedY = 30;

        }

    }


    applyGravity() {

    setInterval(() => {

        this.y -= this.speedY;

        this.speedY -= this.acceleration;

        if (this.y >= 180) {

            this.y = 180;
            this.speedY = 0;

        }

    }, 1000 / 25);

}

    isFalling() {

    return this.speedY < 0;

}


hurt() {

    if (this.isInvincible || this.isDead) return;

    this.isHurt = true;
    this.isInvincible = true;

    this.pushBack();   
    
    setTimeout(() => {
        this.isHurt = false;
    }, 300);

    setTimeout(() => {
        this.isInvincible = false;
    }, 1000);

}


pushBack() {

    if (this.otherDirection) {

        this.x += 20;

    } else {

        this.x -= 20;

    }

}

die() {

    if (this.isDead) return;

    this.isDead = true;
    this.isHurt = false;

    this.deadFrame = 0;
    this.deadAnimationFinished = false;

    playCharacterDeathSound();

}

}