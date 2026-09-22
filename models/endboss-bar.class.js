/**
 * Represents the health bar of the endboss.
 *
 * Extends the standard StatusBar with a different position
 * on the game screen.
 */
class EndbossBar extends StatusBar {

    /**
     * Creates the endboss health bar and sets it to 100%.
     */
    constructor() {

        super();
    
        this.x = 500;
        this.y = 20;
    
        this.width = 200;
        this.height = 60;
    
    
        this.setPercentage(100);
    

    
    }

}