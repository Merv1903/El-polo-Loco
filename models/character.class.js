/**
 * Represents the playable Pepe character.
 *
 * Handles movement, jumping and communication with
 * the animation and action classes.
 */
class Character extends MovableObject {

    /** Keyboard input handler. */
    keyboard;

    /** Reference to the current game world. */
    world;

    /** Indicates whether the character is facing the opposite direction. */
    otherDirection = false;

    /** Character's current energy. */
    energy = 100;

    /** Number of collected coins. */
    coins = 0;

    /** Number of collected bottles. */
    bottles = 0;
    
    /** Prevents repeated throws while D is held. */
    throwPressed = false;


    /** Minimum time between bottle throws in milliseconds. */
    throwCooldown = 700;

    /** Timestamp of the last bottle throw. */
    lastThrowTime = 0;

    /** Indicates whether the character is currently hurt. */
    isHurt = false;

    /** Indicates whether the character is temporarily invincible. */
    isInvincible = false;

    /** Indicates whether the character is dead. */
    isDead = false;

    /** Current frame of the death animation. */
    deadFrame = 0;

    /** Vertical movement speed. */
    speedY = 0;

    /** Gravity acceleration. */
    acceleration = 2.0;

    /** Timestamp of the last player input. */
lastInputTime = Date.now();

    /** Images used for the idle animation. */
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

/** Images used for the long idle animation. */
IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
];


    /** Images used for the walking animation. */
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];


    /** Images used for the jump animation. */
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


    /** Images used for the hurt animation. */
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ];


    /** Images used for the death animation. */
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];


    /**
     * Creates the playable character.
     *
     * @param {Keyboard} keyboard - Keyboard input handler.
     * @param {World} world - Current game world.
     */
    constructor(keyboard, world) {

        super();

        this.keyboard = keyboard;
        this.world = world;

        this.loadImage(this.IMAGES_IDLE[0]);

        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
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


    /**
     * Updates the character animation.
     */
    animate() {

        CharacterAnimation.animate(this);

    }


    /**
     * Handles the character's movement and actions.
     */
    move() {

        if (this.world.paused) return;
    
        if (this.isDead) return;
    
        if (
            this.keyboard.RIGHT ||
            this.keyboard.LEFT ||
            this.keyboard.SPACE ||
            this.keyboard.D
        ) {
    
            this.lastInputTime = Date.now();
    
        }
    
        this.moveHorizontal();
        this.handleJump();
        this.handleThrow();
    
    }


    /**
     * Handles horizontal movement and direction.
     */
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


    /**
     * Moves the character to the right within the level boundaries.
     */
    moveRight() {

        if (this.x < this.world.level.level_end_x - this.width) {

            this.x += 5;

        }

    }


    /**
     * Moves the character to the left within the level boundaries.
     */
    moveLeft() {

        if (this.x > 0) {

            this.x -= 5;

        }

    }


    /**
     * Handles the jump action.
     */
    handleJump() {

        CharacterActions.handleJump(this);

    }


    /**
     * Handles the bottle throw action.
     */
    handleThrow() {

        CharacterActions.handleThrow(this);

    }


    /**
     * Checks whether the character is above the ground.
     *
     * @returns {boolean} True if the character is above the ground.
     */
    isAboveGround() {

        return this.y < 180;

    }


    /**
     * Makes the character jump if it is on the ground.
     */
    jump() {

        if (!this.isAboveGround()) {

            this.speedY = 29;

        }

    }


    /**
     * Applies gravity to the character.
     */
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


    /**
     * Checks whether the character is currently falling.
     *
     * @returns {boolean} True if the character is falling.
     */
    isFalling() {

        return this.speedY < 0;

    }


    /**
     * Handles damage to the character.
     */
    hurt() {

        CharacterActions.hurt(this);

    }


    /**
     * Starts the character's death state.
     */
    die() {

        CharacterActions.die(this);

    }

}