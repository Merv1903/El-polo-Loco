class CollectableObject extends MovableObject {

    collected = false;

    constructor(x, y) {

        super();

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 80;

    }

}