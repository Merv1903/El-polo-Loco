/**
 * Handles the action behavior of the character.
 *
 * Contains methods for jumping, throwing bottles,
 * taking damage and dying.
 */
class CharacterActions {
  /**
   * Handles the jump input.
   *
   * @param {Character} character - The character performing the action.
   */
  static handleJump(character) {
    if (character.keyboard.SPACE) {
      character.jump();

      character.keyboard.SPACE = false;
    }
  }

  /**
   * Handles bottle throwing.
   *
   * @param {Character} character - The character throwing the bottle.
   */
  static handleThrow(character) {
    if (!character.keyboard.D) {
      character.throwPressed = false;
      return;
    }

    if (character.throwPressed) {
      return;
    }

    const now = Date.now();

    if (now - character.lastThrowTime < character.throwCooldown) {
      return;
    }

    character.throwPressed = true;
    character.lastThrowTime = now;

    CharacterActions.throwBottle(character);
  }

  /**
   * Throws a bottle if the character has bottles available.
   *
   * @param {Character} character - The character throwing the bottle.
   */
  static throwBottle(character) {
    if (character.bottles <= 0) return;

    const bottle = new ThrowableBottle(
      character.x + 60,
      character.y + 100,
      character.otherDirection,
    );

    character.world.throwableBottles.push(bottle);

    character.bottles--;

    character.world.updateItemBar("bottles");
  }

  /**
   * Applies damage to the character and activates temporary invincibility.
   *
   * @param {Character} character - The character taking damage.
   */
  static hurt(character) {
    if (character.isInvincible || character.isDead) return;

    character.isHurt = true;
    character.isInvincible = true;

    CharacterActions.pushBack(character);

    setTimeout(() => {
      character.isHurt = false;
    }, 300);

    setTimeout(() => {
      character.isInvincible = false;
    }, 1000);
  }

  /**
   * Pushes the character away from the enemy.
   *
   * @param {Character} character - The character being pushed back.
   */
  static pushBack(character) {
    if (character.otherDirection) {
      character.x += 20;
    } else {
      character.x -= 20;
    }
  }

  /**
   * Starts the character's death state and plays the death sound.
   *
   * @param {Character} character - The character that dies.
   */
  static die(character) {
    if (character.isDead) return;

    character.isDead = true;
    character.isHurt = false;

    character.deadFrame = 0;
    character.deadAnimationFinished = false;

    playCharacterDeathSound();
  }
}
