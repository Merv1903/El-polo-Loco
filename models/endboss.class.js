/**
 * Represents the endboss of the game.
 *
 * The endboss can walk, detect Pepe, attack, get hurt and die.
 */
class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates the endboss.
   *
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   */
  constructor(x, y) {
    super();

    this.loadImage(this.IMAGES_WALKING[0]);

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = x;
    this.y = y;

    this.world = world;

    this.width = 350;
    this.height = 350;

    this.energy = 100;
    this.damage = 21;

    this.alive = true;
    this.active = false;

    this.state = "walking";
    this.lastAnimation = 0;
    this.isHurt = false;
    this.otherDirection = false;

    this.speed = 0.8;
    this.speedY = 0;
    this.acceleration = 2.5;

    setInterval(() => {
      this.speed = 0.8 + Math.random() * 0.7;
    }, 2000);

    this.alertFrame = 0;
    this.attackFrame = 0;
    this.hurtFrame = 0;
    this.deadFrame = 0;
    this.nextJumpTime = Date.now() + this.getRandomJumpDelay();
    this.animate();
    this.applyGravity();
  }

  /**
   * Applies gravity to the endboss.
   *
   * The boss is kept above the ground and returns to
   * the walking state after landing from a jump.
   */
  applyGravity() {
    setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;

      if (this.y >= 80) {
        this.y = 80;
        this.speedY = 0;

        if (this.state === "jump") {
          this.state = "walking";
        }
      }
    }, 1000 / 25);
  }

  /**
   * Updates the endboss behavior.
   *
   * Distance detection, jumping, movement and animation
   * are handled during each update cycle.
   */
  update() {
    this.checkDistance();

    if (Date.now() >= this.nextJumpTime && this.state === "walking") {
      this.jump();
    }

    this.move();
    this.animateWithDelay();
  }

  /**
   * Checks the distance between the endboss and Pepe.
   */
  checkDistance() {
    if (this.state === "alert") return;

    const distance = Math.abs(this.x - this.world.character.x);

    this.handleDistance(distance);
  }

  /**
   * Determines the endboss state based on the distance to Pepe.
   *
   * @param {number} distance - Distance between the boss and Pepe.
   */
  handleDistance(distance) {
    if (this.isTooFar(distance)) {
      this.resetDetection();
      return;
    }

    if (this.shouldAttack(distance)) {
      this.state = "attack";
      return;
    }

    if (this.shouldAlert(distance)) {
      this.startAlert();
      return;
    }

    if (this.hasSeenCharacter) return;

    this.state = "walking";
  }

  /**
   * Checks whether Pepe is too far away for the boss to react.
   *
   * @param {number} distance - Distance between the boss and Pepe.
   * @returns {boolean} True if the distance is greater than 1000.
   */
  isTooFar(distance) {
    return distance > 1000;
  }

  /**
   * Resets the boss detection state when Pepe is too far away.
   */
  resetDetection() {
    this.hasSeenCharacter = false;
    this.state = "walking";
  }

  /**
   * Checks whether the boss should enter the alert state.
   *
   * @param {number} distance - Distance between the boss and Pepe.
   * @returns {boolean} True if Pepe is within alert range.
   */
  shouldAlert(distance) {
    return !this.hasSeenCharacter && distance <= 500;
  }

  /**
   * Starts the alert state of the endboss.
   */
  startAlert() {
    this.state = "alert";
    this.hasSeenCharacter = true;
    this.alertFinished = false;
    this.alertFrame = 0;
  }

  /**
   * Checks whether the boss is close enough to attack Pepe.
   *
   * @param {number} distance - Distance between the boss and Pepe.
   * @returns {boolean} True if Pepe is within attack range.
   */
  shouldAttack(distance) {
    return distance <= 50;
  }

  /**
   * Reduces the endboss's energy after being hit by a bottle.
   *
   * Updates the boss health bar and starts the death sequence
   * when the energy reaches zero.
   */
  hit() {
    this.energy -= 20;
    this.isHurt = true;
    this.hurtFrame = 0;

    this.world.endbossBar.setPercentage(this.energy);

    if (this.energy <= 0) {
      this.energy = 0;
      this.world.endbossBar.setPercentage(0);
      this.die();
    }
  }

  /**
   * Starts the endboss death sequence.
   *
   * After a short delay the boss is removed and the
   * victory sequence is triggered.
   */
  die() {
    if (!this.alive) return;

    this.alive = false;
    this.isDead = true;
    this.deadFrame = 0;

    setTimeout(() => {
      this.remove = true;

      this.world.winGame();
    }, 1000);
  }
}
