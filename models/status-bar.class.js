/**
 * Represents a status bar used to display a percentage value.
 *
 * The bar uses different images depending on the current percentage.
 */
class StatusBar extends DrawableObject {

    /**
     * Images representing the different percentage levels
     * of the status bar.
     */
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];


    /**
     * Creates the status bar and sets its initial value to 100%.
     */
    constructor() {

        super();

        this.x = 20;
        this.y = 20;

        this.width = 200;
        this.height = 60;

        this.loadImages(this.IMAGES);

        this.setPercentage(100);

    }


    /**
     * Updates the percentage and selects the corresponding image.
     *
     * @param {number} percentage - Current percentage value.
     */
    setPercentage(percentage) {

        this.percentage = percentage;

        let path = this.IMAGES[this.resolveImageIndex()];

        this.img = this.imageCache[path];

    }


    /**
     * Determines which status bar image matches the current percentage.
     *
     * @returns {number} Index of the image representing the percentage.
     */
    resolveImageIndex() {

        if (this.percentage == 100) {
            return 5;
        }

        if (this.percentage >= 80) {
            return 4;
        }

        if (this.percentage >= 60) {
            return 3;
        }

        if (this.percentage >= 40) {
            return 2;
        }

        if (this.percentage >= 20) {
            return 1;
        }

        return 0;

    }

}