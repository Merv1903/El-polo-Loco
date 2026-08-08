class Coin extends CollectableObject {

    IMAGES = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];

    constructor(x, y) {

        super(x, y);

        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.animate();

    }

    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES);

        }, 200);

    }

}