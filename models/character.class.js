class Character extends MovableObject {
  keyboard;
  world;
  otherDirection = false;

   energy = 100;
  coins = 0;
  bottles = 0;

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
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor(keyboard, world) {
    super();

    this.keyboard = keyboard;
    this.world = world;
    this.loadImage(this.IMAGES_IDLE[0]);

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);

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

    if (this.keyboard.RIGHT || this.keyboard.LEFT) {

        this.playAnimation(this.IMAGES_WALKING);

    } else {

        this.playAnimation(this.IMAGES_IDLE);

    }

}

  move() {

    if (this.world.paused) return;

    if (
        this.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x - this.width
    ) {

        this.otherDirection = false;
        this.x += 5;

    }

    if (
        this.keyboard.LEFT &&
        this.x > 0
    ) {

        this.otherDirection = true;
        this.x -= 5;

    }

}
}
