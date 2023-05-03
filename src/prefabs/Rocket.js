
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.timeFired = -1000;
        //this.combo = false;
        this.combo = 0;
        this.bullets = [];
        for (let i = 0; i < 10; i++) {
            this.bullets.push(new Bullet(scene, 0, 0, 'rocket').setOrigin(0, 0));
            //this.bullets[i].alpha = 0;
        }
        this.bulletCount = 0;
        //this.bullet = new Bullet(scene, 0, 0, 'rocket').setOrigin(0, 0);
        //this.bullet.alpha = 0;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
        for (let i = 0; i < 10; i++) {
            this.bullets[i].update();
            if (this.bullets[i].isFiring && this.bullets[i].y <= borderUISize * 3 + borderPadding) {
                //this.combo = false;
                this.combo = 0;
                //console.log(this.combo);
                this.bullets[i].reset();
            }
        }
        //this.bullet.update();
        //if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        //}

        // Fire button
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            //this.cooldown = 
            //console.log(game.getTime());
            if (game.getTime() - this.timeFired >= 1000) {
            this.timeFired = game.getTime();
            this.isFiring = true;
            this.sfxRocket.play();
            this.bullets[this.bulletCount].fire(this);
            this.bulletCount += 1;
            if (this.bulletCount == 10) {
                this.bulletCount = 0;
            }
            }
        }

        //this.bullet.fire();

        
        // If fired, move up
        //if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
        //    this.y -= this.moveSpeed;
        //}
        // Reset on miss
        //if (this.y <= borderUISize * 3 + borderPadding) {
            //this.combo = false;
        //    this.combo = 0;
        //    console.log(this.combo);
        //    this.reset();
        //}
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
