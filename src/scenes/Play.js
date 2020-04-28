class Play extends Phaser.Scene {

    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('player', './assets/player.png');
        this.load.image('playsky', './assets/playskybackground.png');

    }

    create() {
        
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.gameOver = false;

        //background
        this.add.image(centerX, centerY, 'playsky');

        //player
        this.p1= new Player(this, centerX, centerY, 'player').setScale(1.5, 1.5).setOrigin(0, 0);
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        
        if(!this.gameover)
        {
            this.p1.update();
        }
    }
}