class ChickenMedium extends Chicken {

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGE_DEAD =
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    constructor(x, y) {

        super(x, y);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGES_WALKING[0]);

        this.width = 70;
        this.height = 70;

        this.damage = 10;
    }

}