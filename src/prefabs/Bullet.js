
class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.playerBullet = true;
        this.isFiring = false;
        this.moveSpeed = 2;
        this.alpha = 0;
        //this.combo = false;
        //this.combo = 0;

        // add rocket sfx
        //this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
        //if (!this.isFiring) {
        //    if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
        //        this.x -= this.moveSpeed;
        //    } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        //        this.x += this.moveSpeed;
        //    }
        //}

        // Fire button
        //if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            //this.isFiring = true;
        //    this.sfxRocket.play();
        //}
        // If fired, move up
        //console.log("bruh");
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // Reset on miss
        //if (this.isFiring && this.y <= borderUISize * 3 + borderPadding) {
            //this.combo = false;
            //this.combo = 0;
            //console.log(this.combo);
        //    this.reset();
        //}
    }

    fire(ship) {
        if (this.playerBullet = true) {
            this.x = ship.x - ship.width / 2;
            this.y = ship.y - ship.height;
        } else {
            this.x = ship.x - ship.width / 2;
            this.y = ship.y + ship.height;
        }
        this.isFiring = true;
        this.alpha = 1;
    }

    reset() {
        this.isFiring = false;
        this.y = 0;
        this.x = 0;
        this.alpha = 0;
    }
}