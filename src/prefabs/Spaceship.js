class spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {        
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        // SPAWN SIDE
        this.direction = Math.floor(Math.random() * 2) == 0 ? 'left' : 'right';
        //if (this.direction == 'left') {
        //    this.flipX = true;
        //}

        // BULLETS
        this.bullets = [];
        for (let i = 0; i < 10; i++) {
            //let bullet = new Bullet(scene, 0, 0, 'rocket').setOrigin(0, 0);
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
            this.x -= this.moveSpeed; // *(combo <= 1 ? 1 : combo / 2);
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }

        if(this.x <= 0 - this.width) {
            this.reset();
        }

        for (let i = 0; i < 10; i++) {
            //console.log(this.bullets[i].playerBullet);
            this.bullets[i].update();
            if (this.bullets[i].isFiring && this.bullets[i].y >= game.config.height - borderPadding) {
                //this.combo = false;
                //this.combo = 0;
                //console.log(this.combo);
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
        //console.log(this.bullets[this.bulletCount].playerBullet);
        if (!this.bullets[this.bulletCount].isFiring) {
            this.bullets[this.bulletCount].fire(this);
        }
        
        this.bulletCount += 1;
        if (this.bulletCount == 10) {
            this.bulletCount = 0;
        }
        //}, null, this);
        //this.bulletCount += 1;
        //if (this.bulletCount == 10) {
        //    this.bulletCount = 0;
        //}
    }

}

