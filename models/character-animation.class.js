/**
 * Handles the animation behavior of the character.
 *
 * Contains methods for idle, walking, jumping,
 * hurt and death animations.
 */
class CharacterAnimation {

    /**
     * Updates the character animation based on its current state.
     *
     * @param {Character} character - The character to animate.
     */
    static animate(character) {

        if (character.world.paused) return;

        if (character.isDead) {

            CharacterAnimation.playDeadAnimation(character);
            return;

        }

        if (character.isHurt) {

            CharacterAnimation.playHurtAnimation(character);
            return;

        }

        CharacterAnimation.playMovementAnimation(character);

    }


    /**
     * Plays the hurt animation.
     *
     * @param {Character} character - The character to animate.
     */
    static playHurtAnimation(character) {

        character.playAnimation(character.IMAGES_HURT);

    }


    /**
     * Plays the death animation frame by frame.
     *
     * @param {Character} character - The character to animate.
     */
    static playDeadAnimation(character) {

        if (character.deadAnimationFinished) return;

        character.loadImage(
            character.IMAGES_DEAD[character.deadFrame]
        );

        if (
            character.deadFrame <
            character.IMAGES_DEAD.length - 1
        ) {

            character.deadFrame++;

        } else {

            character.deadAnimationFinished = true;

        }

    }


    /**
     * Selects the appropriate movement animation.
     *
     * @param {Character} character - The character to animate.
     */
    static playMovementAnimation(character) {

        if (character.isAboveGround()) {
    
            character.playAnimation(character.IMAGES_JUMP);
            return;
    
        }
    
        if (character.keyboard.RIGHT || character.keyboard.LEFT) {
    
            character.playAnimation(character.IMAGES_WALKING);
            return;
    
        }
    
        if (Date.now() - character.lastInputTime >= 5000) {
    
            character.playAnimation(character.IMAGES_LONG_IDLE);
            return;
    
        }
    
        character.playAnimation(character.IMAGES_IDLE);
    
    }

}