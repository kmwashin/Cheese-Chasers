//generates a random int between 0 and max-1
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);


    }

    update(score) {
        this.x -= game.settings.runnerSpeed;

        //reset ship to right side when left side is hit
        if(this.x <= 0-this.width)
          {
            this.reset(score);
          }

    }

    //reset on right side of screen with new, randomized position
    //the four heights:320, 400, 480, 585
    reset(score) {

        //0-3
        this.height = getRandomInt(4);

        if(this.height == 0)
        {
            this.y = 320;
        }

        if(this.height == 1)
        {
            this.y = 400;
        }

        if(this.height == 2)
        {
            this.y = 480;
        }

        if(this.height == 3)
        {
            this.y = 590;
        }

        this.x = 960;

        game.settings.peoplePassed++;
        score.text = "People who've passed you: " + game.settings.peoplePassed;

    }
}