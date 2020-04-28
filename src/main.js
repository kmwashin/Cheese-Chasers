/*
William Gadd
Kenice Washington
Ben Tingley

Title: Cheese Chasers

Date Completed:

Creative tilt: Handcrafted sprites create an atmosphere that evokes
some of the real life thrill of the chase.

*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play ] 
  }

let game = new Phaser.Game(config);

// define game settings
game.settings = {
  runnerSpeed: 5
  
}

// reserve keyboard vars
let keyDOWN, keyUP, keyLEFT, keyRIGHT, keyR, keyM;