 theGame = function(game){
 player=null;
 bads=null;
 kills=null;
 badFireRate = 2500;
 badNextFire = 0;
 fireRate=1000;
 nextFire = 0;
 bullets=null;
 badBullets=null;
 badAlive = [];
 badAlive2 = [];
 life = 10;
 score=null;
 scoreText=null;
 spriteLife=null;
 endKill=null;
 killNbr = 0;
 burst=null;
}

theGame.prototype = {
	create : function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//Variables
		back = this.game.add.sprite(0,0,'back');
		spriteLife = this.game.add.sprite(105,645,'spriteLife');
		this.game.add.sprite(60,660,'heart');
		score=0;
		life = 10;
		nextFire = this.game.time.now;
		cursors = this.game.input.keyboard.createCursorKeys();
		
		explosions = game.add.group();

		for (var i = 0; i < 10; i++)
		{
			var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
			explosionAnimation.anchor.setTo(0.5, 0.5);
			explosionAnimation.animations.add('kaboom');
		}
		
		//Text
		scoreText = this.game.add.text(35, 200, "$" , { font: '30px Courrier New', fill: '#f4ffad' });
		
		//Groups
		kills = this.game.add.group();
		
		bads = this.game.add.group();
		bads.enableBody = true;
		bads.physicsBodyType = Phaser.Physics.ARCADE;

		//Bullets
		bullets = this.game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'cat', 0, false);
		
		badBullets = this.game.add.group();
		badBullets.enableBody = true;
		badBullets.physicsBodyType = Phaser.Physics.ARCADE;
		badBullets.createMultiple(30, 'bullet', 0, false);
		
		//Luncher
		this.spawnPlayer();
		this.lunch();
		
	},
	
	update : function() {
		this.game.physics.arcade.overlap(bullets, bads, this.killBad, null , this);
		this.game.physics.arcade.overlap(badBullets, player, this.killPlayer, null , this);
		
		player.body.velocity.x = 0;
		player.rotation = this.game.physics.arcade.angleToPointer(player);
		
		
		if (cursors.left.isDown) {
			player.body.velocity.x -= 500;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x += 500;
		}
		
		if (this.game.input.activePointer.isDown) {
			this.fire();
		}
		
		if(this.game.time.now > badNextFire) {
			this.badFire();
		}
		
	},
		
	spawnPlayer : function() {
		player = this.game.add.sprite(512, 640, 'player');
		player.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		player.scale.setTo(2, 2);
		this.resetLife();
	},
	lunch : function() {
		var list_pos = new Array();
		list_pos.push({"x": 10, "y": 100});
		list_pos.push({"x": 1000, "y": 200});
		list_pos.push({"x": 10, "y": 300});
		list_pos.push({"x": 1000, "y": 400});
		list_pos.forEach(function(posi){			
			bad = bads.create(posi["x"], posi["y"], 'thorin');
			if(posi["x"] == 10) {
				x=1000;
			}
			else {
				x=10;
			}
			this.game.add.tween(bad).to(
            { x: x }, 5000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
		});
			
		bads.forEach(function(bad) {
			bad.anchor.setTo(0.5,0.5);
		});
	},
	spawnBads : function(y) {
		if(y==100 || y==300) {
			x=10;
			xx=1000;
		}
		else {
			x=1000;
			xx=10;
		}
		bad = bads.create(x, y, 'thorin');
		this.game.add.tween(bad).to( { x: xx }, 5000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
		
		bad.anchor.setTo(0.5,0.5);
	},
	resetLife : function() {
		spriteLife.frame = life-1;
	},
	bulletOut : function(bullet) {
		bullet.kill();
	},
	killBad : function(bullet, bad) {
		bad.kill();
		bullet.kill();
		score += 100;
		killNbr ++;
		endKill =  this.game.time.now + 1000;
		
		var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(bad.x, bad.y);
        explosionAnimation.play('kaboom', 30, false, true);
		this.spawnBads(bad.y);
		
	},
	killPlayer : function(player, bad) {
		if(player.alive==true) {
			player.kill();
		}
		player.kill();
		bad.kill();
		life--;
		if(life>0) {
			this.spawnPlayer();
		}
		else {
			this.gameOver();
		}
	},
	fire : function() {
		if (this.game.time.now > nextFire && bullets.countDead() > 0) {
			nextFire = this.game.time.now + fireRate;
			var bullet = bullets.getFirstExists(false);
			bullet.checkWorldBounds = true;
			bullet.events.onOutOfBounds.add(this.bulletOut, this);
			bullet.reset(player.x, player.y);
			bullet.rotation = this.game.physics.arcade.angleToPointer(bullet);
			this.game.physics.arcade.velocityFromRotation(bullet.rotation, 800, bullet.body.velocity);	
		}
	},
	badFire : function() {
		var badBullet = badBullets.getFirstExists(false);
		badBullet.checkWorldBounds = true;
		badBullet.events.onOutOfBounds.add(this.bulletOut, this);
		badAlive.length=0;
		bads.forEachAlive(function(bad){
			badAlive.push(bad);
		});
		if(badAlive.length > 0) {
			var rdm=this.game.rnd.integerInRange(0,badAlive.length-1);
			var shooter = badAlive[rdm];
			badBullet.reset(shooter.body.x, shooter.body.y);
			badBullet.rotation = this.game.physics.arcade.angleBetween(badBullet, player); 
			this.game.physics.arcade.moveToObject(badBullet,player,300);
			
			badNextFire = this.game.time.now + badFireRate;
		}
	},
	gameOver : function() {
		this.game.state.start("GameOver");
	},
	gameWin : function() {
		this.game.state.start("GameWin");
	},
	render : function() {
		scoreText.setText("$" +score);
		if(this.game.time.now < endKill) {
			for(i=1;i<=killNbr;i++) {
				kill = kills.create(900, 25*i, 'kill');
				this.game.add.tween(kill).to({alpha:0 }, 5000, Phaser.Easing.Quadratic.In, true, 0, 1);
			}
		}
		else {
			killNbr = 0;
		}
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 716);
	}
}

