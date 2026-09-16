/**
 * Represents the coin status bar displayed in the game.
 *
 * Extends DrawableObject and displays the current
 * coin percentage using different status bar images.
 */
class CoinBar extends DrawableObject {

    /**
     * Images used for the different coin percentages.
     */
    IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];


    /**
     * Creates a new coin status bar.
     *
     * Initializes the position, size and starting percentage.
     */
    constructor() {

        super();

        this.x = 20;
        this.y = 85;

        this.width = 200;
        this.height = 60;

        this.loadImages(this.IMAGES);

        this.setPercentage(0);

    }


    /**
     * Updates the coin percentage and displayed image.
     *
     * @param {number} percentage - Current coin percentage.
     */
    setPercentage(percentage) {

        this.percentage = percentage;

        let path = this.IMAGES[this.resolveImageIndex()];

        this.img = this.imageCache[path];

    }


    /**
     * Determines the image index based on the current percentage.
     *
     * @returns {number} Index of the corresponding status bar image.
     */
    resolveImageIndex() {

        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;

        return 0;

    }

}