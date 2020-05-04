class Play extends Phaser.Scene {

    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('player', './assets/player.png');
        this.load.image('runner', './assets/runner.png');
        this.load.image('over', './assets/gameoverscreen.png');
        this.load.image('playsky', './assets/playskybackground.png');

        //texture atlas
        this.load.atlas('runnerA', './assets/runnerA.png', './assets/runnerA.json');

    }

    create() {

        //animations
         this.anims.create({ 
             key: 'tumble', 
             frames: this.anims.generateFrameNames('runnerA', {prefix: 'runnerA', start: 0, end: 11, suffix: '', zeroPad: 4 }),
             framerate: 60,
             repeat: -1 
         });

        
        game.settings.peoplePassed = 0;
        
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.gameOver = false;

        //background
        this.add.image(centerX, centerY, 'playsky');

        //player
        this.p1= new Player(this, centerX/2, centerY+60, 'player').setOrigin(0, 0);

        //runner x3. base-> initial x axis spawn, spacer-> hoisontal distance between
        let runnerbase = 2000;
        let runnerspacer = 150;
        
        
        this.run1 = new Runner(this, runnerbase, 320, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run2 = new Runner(this, runnerbase-runnerspacer, 400, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run3 = new Runner(this, runnerbase-runnerspacer*2, 320, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run4 = new Runner(this, runnerbase-runnerspacer*3, 400, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run5 = new Runner(this, runnerbase-runnerspacer*4, 480, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run6 = new Runner(this, runnerbase-runnerspacer*5, 560, 'runnerA').setOrigin(0, 0).play('tumble');


        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //animations

        //score display
        let scoreConfig = {
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

        this.score = this.add.text(69, 54, "People who've passed you: " + game.settings.peoplePassed, scoreConfig);

    }

    update() {

        
        
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            //might help with score later?
            //this.scene.restart(this.p1Score);
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver)
        {
            this.p1.update();
            this.run1.update(this.score);
            this.run2.update(this.score);
            this.run3.update(this.score);
            this.run4.update(this.score);
            this.run5.update(this.score);
            this.run6.update(this.score);
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
        this.add.text(game.config.width/2, game.config.height/2 - 64, ' GAME OVER ', gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, ' You were passed by ' + game.settings.peoplePassed +" people before succumbing to the cheese. ", gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, ' R to Restart or M for Menu ', gameoverConfig).setOrigin(0.5);
    }

    checkCollision(player, runner) {
        //runner width and height being set to 0 on reset? hard code quick fix.
        this.width = 48;
        this.height = 48;
        // simple AABB checking
        if (player.x < runner.x + this.width && 
            player.x + player.width > runner.x && 
            player.y < runner.y + this.height &&
            player.height + player.y > runner.y) {
                return true;
        } else {
            return false;
        }
    }
}