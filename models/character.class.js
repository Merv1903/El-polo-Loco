class Character extends MovableObject {

    keyboard;

    otherDirection = false;

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

    constructor(keyboard) {

        super();

        this.keyboard = keyboard;

   this.loadImage(this.IMAGES_IDLE[0]);

this.loadImages(this.IMAGES_IDLE);
this.loadImages(this.IMAGES_WALKING);

        this.x = 120;
        this.y = 180;

        this.width = 120;
        this.height = 250;

        this.animate();
        this.move();

    }

animate() {

    setInterval(() => {

        if (this.keyboard.RIGHT || this.keyboard.LEFT) {

            this.playAnimation(this.IMAGES_WALKING);

        } else {

            this.playAnimation(this.IMAGES_IDLE);

        }

    }, 180);

}

 move() {

    setInterval(() => {

        if (this.keyboard.RIGHT) {

            this.otherDirection = false;
            this.x += 5;

        }

        if (this.keyboard.LEFT) {

            this.otherDirection = true;
            this.x -= 5;

        }

    }, 1000 / 60);

}

}