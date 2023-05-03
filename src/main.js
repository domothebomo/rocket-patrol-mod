/**
Dominic Fanaris
Title: Rocket Patrol 2: Mars Mission!
Time spent: ~10 hours

Mod List
- High Score (5)
- FIRE UI Text (5)
- Implement Speed Increase After 30 Seconds (5)
- Randomize spaceships movement at start of each play (5)
- New scrolling tile sprite (5)
- Display time remaining (10)
- Use texture atlas to animate spaceships (10)
- Create a new title screen (10)
- New enemy spaceship type (15)
- Implement timing/scoring mechanism to add time to clock on hits (15)

Custom Mods (Approved by Jared Pettit)
- Implemented bullet system where the player fires bullets instead of the rocket itself,
  and enemy ships will fire bullets back at the player (5)
- Implemented a power-up (the satellite) which activates a rapid-fire mode for a limited time
  when it is destroyed (10)
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT, keyESC;

let highscoreNovice = 0;
let highscoreExpert = 0;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;