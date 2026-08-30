class Level {

        level_end_x = 4320;

    backgrounds = [];

        coins = [];
        bottles = [];
            chickens = [];

    constructor() {

        this.backgrounds = [

            /* ===========================
               ABSCHNITT 1
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

            /* ===========================
               ABSCHNITT 2
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 720),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),

            /* ===========================
               ABSCHNITT 3
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 1440),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1440),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1440),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1440),

            /* ===========================
               ABSCHNITT 4
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 2160),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2160),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2160),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2160),

            /* ===========================
               ABSCHNITT 5
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 2880),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2880),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2880),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2880),

            /* ===========================
               ABSCHNITT 6
            =========================== */

            new BackgroundObject("img/5_background/layers/air.png", 3600),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3600),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 3600),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 3600)

        ];

this.coins = [

    // Abschnitt 1
    new Coin(500, 350),
    new Coin(650, 250),

    new Coin(950, 330),

    new Coin(1250, 330),

    // Abschnitt 2
    new Coin(1600, 350),
    new Coin(1750, 280),

    new Coin(2100, 220),
    new Coin(2250, 150),


    // Abschnitt 3
    new Coin(2800, 350),


    new Coin(3300, 300),
    new Coin(3450, 180),

    // Richtung Endboss
    new Coin(3800, 350),


];

this.bottles = [

    new Bottle(700, 330),
    new Bottle(1200, 320),
    new Bottle(500, 350)

];

this.chickens = [

    new Chicken(1000, 370),

    new ChickenMedium(1600, 360),

    new Chicken(2300, 370),

    new ChickenMedium(3000, 360)

];

    }

    
}