BasicGame.Game = function (game) {
var sheep;
var back;
var pipes;
var time;
var time2;
var bound;
var count;
var bool;
var scoreText;
};
BasicGame.Game.prototype = {
    create: function () {
		count = 0;
		time = this.game.time.now;
		time2 = this.game.time.now;
		bool = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		back = this.game.add.tileSprite(0,0,1024,378,"background");
		scoreText = this.game.add.text(500, 25, "" , { font: '30px Courrier New', fill: '#fff' });
		pipes = this.game.add.group();
		pipes.enableBody = true;
		pipes.physicsBodyTypes = Phaser.Physics.ARCADE;
		this.spawnSheep();
    },
    update: function () {
		this.game.physics.arcade.overlap(sheep, pipes, this.killSheep, null , this);
		back.tilePosition.x -= 2;
		if(pipes.getAt(0).x < -100) {
			pipes.getAt(0).destroy();
			pipes.getAt(0).destroy();
			bool = true;
		}
		if(bool && ((pipes.getAt(0).x +100)< sheep.x)) {
			count++;
			bool = false;
		}
		if (time < this.game.time.now) {
			this.spawnPipe();
		}
		if(time2 < this.game.time.now) {
			time2 = this.game.time.now + 250;
			if(sheep.frame == 0) {
				sheep.frame = 1;
			}
			else {
				sheep.frame = 0;
			}
		}
		if(sheep.body.velocity.y < 300) {
			sheep.rotation = sheep.body.velocity.y * 0.005;
		}
		if (this.game.input.activePointer.isDown) {
			this.jump();
		}
		scoreText.setText(count);
		
    },
	jump : function () {
		sheep.body.velocity.y = -300;
	},
	spawnSheep : function () {
		sheep = this.game.add.sprite(300,150,"sheep");
		sheep.anchor.setTo(0.5,0.5);
		this.game.physics.arcade.enable(sheep);
		sheep.body.gravity.y = 600;
		sheep.events.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		sheep.events.jump.onDown.add(this.jump,this);		
		
		sheep.checkWorldBounds = true;
		sheep.events.onOutOfBounds.add(this.killSheep, this);
	},
	spawnPipe : function () {
		var y = this.game.rnd.integerInRange(200, 303);
		var pipe = pipes.create(1000, y, 'pipe');
		pipe.body.velocity.x= -200;
		pipe = pipes.create(1000, y-525, 'pipe');
		pipe.body.velocity.x = -200;
		time = this.game.time.now + 2000;
	},
	killSheep : function () {
		sheep.kill();
		this.game.state.start("GameOver")
	},
};