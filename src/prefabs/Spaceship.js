class spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {        
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.bullets = [];
        for (let i = 0; i < 10; i++) {
            this.bullets.push(new Bullet(scene, 0, 0, 'rocket').setOrigin(0, 0));
            this.bullets[i].flipY = true;
            this.bullets[i].playerBullet = false;
        }
        this.bulletCount = 0;
    }

    update(combo) {
        this.x -= this.moveSpeed * (combo <= 1 ? 1 : combo / 2);

        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }

    fire() {
        console.log('bruh');
        this.bullets[this.bulletCount].fire(this);
        this.bulletCount += 1;
        if (this.bulletCount == 10) {
            this.bulletCount = 0;
        }
    }

}

