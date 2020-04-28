class Play extends Phaser.Scene {

    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('player', './assets/player.png');
        this.load.image('runner', './assets/runner.png');
        this.load.image('over', './assets/gameoverscreen.png');
        this.load.image('playsky', './assets/playskybackground.png');

    }

    create() {
        
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.gameOver = false;

        //background
        this.add.image(centerX, centerY, 'playsky');

        //player
        this.p1= new Player(this, centerX/2, centerY+60, 'player').setScale(1.5, 1.5).setOrigin(0, 0);

        //runner x3. base-> initial x axis spawn, spacer-> hoisontal distance between
        let runnerbase = 2000;
        let runnerspacer = 150;
        this.run1 = new Runner(this, runnerbase, 320, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);
        this.run2 = new Runner(this, runnerbase-runnerspacer, 400, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);
        this.run3 = new Runner(this, runnerbase-runnerspacer*2, 320, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);
        this.run4 = new Runner(this, runnerbase-runnerspacer*3, 400, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);
        this.run5 = new Runner(this, runnerbase-runnerspacer*4, 480, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);
        this.run6 = new Runner(this, runnerbase-runnerspacer*5, 560, 'runner').setScale(1.5, 1.5).setOrigin(0, 0);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            //might help with score later?
            //this.scene.restart(this.p1Score);
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        }

        if(!this.gameover)
        {
            this.p1.update();
            this.run1.update();
            this.run2.update();
            this.run3.update();
            this.run4.update();
            this.run5.update();
            this.run6.update();
        }

        //check collisions
        
        if(this.checkCollision(this.p1, this.run1)) {
            this.hit();
            
        }
        if(this.checkCollision(this.p1, this.run2)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run3)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run4)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run5)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run6)) {
            this.hit();
        }
        
    }

    hit() {
        let gameoverConfig = {
            fontFamily: 'Roboto Condensed',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.gameOver = true;

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        this.add.image(centerX, centerY, 'over');
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or DOWN for Menu', gameoverConfig).setOrigin(0.5);
    }

    checkCollision(player, runner) {
        // simple AABB checking thanks nathan 
        if (player.x < runner.x + runner.width && 
            player.x + player.width > runner.x && 
            player.y < runner.y + runner.height &&
            player.height + player.y > runner. y) {
            return true;
        } else {
            return false;
        }
    }
}