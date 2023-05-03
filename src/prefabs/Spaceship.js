class spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {        
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        // SPAWN SIDE
        this.direction = Math.floor(Math.random() * 2) == 0 ? 'left' : 'right';

        // BULLETS
        this.bullets = [];
        for (let i = 0; i < 10; i++) {
            this.bullets.push(new Bullet(scene, 0, 0, 'bullet').setOrigin(0, 0));
            this.bullets[i].flipY = true;
            this.bullets[i].playerBullet = false;

        }
        this.bulletCount = 0;
    }

    update() {
        if (this.direction == 'right') {
            this.x += this.moveSpeed;
            if(this.x >= game.config.width + this.width) {
                this.reset();
            }
        } else {
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }

        if(this.x <= 0 - this.width) {
            this.reset();
        }

        for (let i = 0; i < 10; i++) {
            this.bullets[i].update();
            if (this.bullets[i].isFiring && this.bullets[i].y >= game.config.height - borderPadding) {
                this.bullets[i].reset();
            }
        }
    }

    reset() {
        if (this.direction == 'right') {
            this.x = 0;
        } else {
            this.x = game.config.width;
        }
    }

    fire() {
        if (!this.bullets[this.bulletCount].isFiring) {
            this.bullets[this.bulletCount].fire(this);
        }
        
        this.bulletCount += 1;
        if (this.bulletCount == 10) {
            this.bulletCount = 0;
        }
    }

}

