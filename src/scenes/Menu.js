class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('title', './assets/title.png');

    }

    create() {
        //menu display
        let menuConfig = {
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
        
        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //title
        this.add.image(centerX, centerY - textSpacer*2, 'title');

        //start button, instructions
        this.add.text(centerX, centerY, ' Press \'UP\' to Start ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, ' READ THIS: ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer+30, ' Use the arrow Keys to Control your cheese chaser and doge obsticals. ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer+60, ' Based on a real sport! ', menuConfig).setOrigin(0.5);
    }

    update() {

    }
}