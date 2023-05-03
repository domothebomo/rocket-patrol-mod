
class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.playerBullet = true;
        this.isFiring = false;
        this.moveSpeed = 2;
        this.alpha = 0;
    }

    update() {
        if (this.playerBullet == true) {
            if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed;
            }
        } else {
            if (this.isFiring && this.y <= game.config.height - borderPadding) {
                this.y += this.moveSpeed
            }
        }
    }

    fire(ship) {
        if (this.playerBullet == true) {
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