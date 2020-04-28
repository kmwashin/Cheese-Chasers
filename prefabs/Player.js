class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        //add sound sfx and any extra variables



    }

    update() {

        let speed = 4;

        //left and right movement
        if(keyLEFT.isDown && this.x >= 0)
        {
            this.x -= speed;
        }
        else if (keyRIGHT.isDown && this.x <= 910)
        {
            this.x += speed;
        }

        //up and down movement
        if(keyUP.isDown && this.y >= 320)
        {
            this.y -= speed;
        }
        else if (keyDOWN.isDown && this.y <= 590)
        {
            this.y += speed;
        }


    }


}