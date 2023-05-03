
class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Play Scene");

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //this.bullet = new Bullet(this, 0, 0, 'rocket').setOrigin(0.5, 0);

        // Player rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        this.ships = [this.ship01, this.ship02, this.ship03];
        this.shipFiring = [false, false, false];

        // CONTROLS
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // ANIMATIONS
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // Score config 
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };

        // UI Text config
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // Display Score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
        //this.scoreConfig.fixedWidth = 0;

        // Display High Score
        this.highScoreText = this.add.text(borderUISize*4.8 + borderPadding, borderUISize + borderPadding*2, "BEST",this.textConfig);
        if (game.settings.mode == 'easy') {
            this.highScore = this.add.text(borderUISize*6.5 + borderPadding, borderUISize + borderPadding*2, highscoreNovice,this.scoreConfig);
        } else {
            this.highScore = this.add.text(borderUISize*6.5 + borderPadding, borderUISize + borderPadding*2, highscoreExpert,this.scoreConfig);
        }
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        this.scoreConfig.fixedWidth = 30;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {this.gameEnd()}, null, this);

        // Display timer
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding*4, borderUISize + borderPadding*2, this.clock.delay / 1000, this.scoreConfig);
        
        // Display Combo
        this.comboText = this.add.text(game.config.width - borderUISize*5.5 - borderPadding, borderUISize + borderPadding*2, 'COMBO', this.textConfig);
        this.comboDisplay = this.add.text(game.config.width - borderUISize*3.5 - borderPadding, borderUISize + borderPadding*2, 'x' + this.p1Rocket.combo, this.scoreConfig);
        this.activeCombo = false;

        // Speedup
        this.speedup = false;

        this.scoreConfig.fixedWidth = 0;
    }

    update() {
        // Update clock timer
        this.timeRight.text = Math.ceil((this.clock.delay - this.clock.elapsed) / 1000);
        
        // Update combo counter
        if (this.activeCombo == true && this.p1Rocket.combo == 0) {
            this.activeCombo = false;
            this.comboDisplay.text = 'x' + this.p1Rocket.combo;
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.speedup && this.clock.elapsed > 30000) {
            this.ship01.moveSpeed *= 2;
            this.ship02.moveSpeed *= 2;
            this.ship03.moveSpeed *= 2;
            this.speedup = true;
        }
        
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update(this.p1Rocket.combo);
            this.ship02.update(this.p1Rocket.combo);
            this.ship03.update(this.p1Rocket.combo);

            // UPDATE BULLETS
            for (let i = 0; i < 3; i++) {
                //console.log(this.ships[i]);
                //console.log(this.ships[i].x);
                if (Math.abs(this.ships[i].x - this.p1Rocket.x) < 3) {
                    //console.log('gah');
                    if (!this.shipFiring[i]) {
                        this.ships[i].fire();
                        this.shipFiring[i] = true;
                    }
                    this.delay = this.time.delayedCall(1000, () => {
                        this.shipFiring[i] = false;
                    }, null, this);
                }
                //this.ship01.fire();
                //this.ship02.fire();
                //this.ship03.fire();
            }
        }

        // check collisions
        for (let i = 0; i < 10; i++) {
            if (this.checkCollision(this.p1Rocket.bullets[i], this.ship03)) {
                this.p1Rocket.bullets[i].reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p1Rocket.bullets[i], this.ship02)) {
                this.p1Rocket.bullets[i].reset();
                this.shipExplode(this.ship02);   
            }
            if (this.checkCollision(this.p1Rocket.bullets[i], this.ship01)) {
                this.p1Rocket.bullets[i].reset();
                this.shipExplode(this.ship01); 
            }
            if (this.checkCollision(this.ship03.bullets[i], this.p1Rocket)) {
                this.ship03.bullets[i].reset();
                this.gameEnd();
                //this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.ship02.bullets[i], this.p1Rocket)) {
                this.ship02.bullets[i].reset();
                this.gameEnd();
                //this.shipExplode(this.ship02);   
            }
            if (this.checkCollision(this.ship01.bullets[i], this.p1Rocket)) {
                this.ship01.bullets[i].reset();
                this.gameEnd();
                //this.shipExplode(this.ship01); 
            }
        }
        /**if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01); 
        }*/
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.activeCombo = true;
        this.p1Rocket.combo += 1;
    
        // score add and repaint
        this.p1Score += ship.points * this.p1Rocket.combo;
        this.scoreLeft.text = this.p1Score;

        if (game.settings.mode == 'easy') {
            if (this.p1Score > highscoreNovice) {
                highscoreNovice = this.p1Score;
                this.highScore.text = highscoreNovice;
            }
        } else {
            if (this.p1Score > highscoreExpert) {
                highscoreExpert = this.p1Score;
                this.highScore.text = highscoreExpert;
            }
        }

        this.clock.elapsed -= 1000; //* (this.p1Rocket.combo / 2);
        //this.scoreLeft.text = this.p1Score;
        this.comboDisplay.text = 'x' + this.p1Rocket.combo;

        this.sound.play('sfx_explosion');
    }

    gameEnd() {
        //console.log('game');
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (ESC) for Menu', this.scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }
}