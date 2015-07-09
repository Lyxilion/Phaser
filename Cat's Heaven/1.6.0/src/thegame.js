 theGame = function(game){
 player=null;
 bads=null;
 badFireRate = 2500;
 badNextFire = 0;
 bossFireRate = 1000;
 bossNextFire = 0;
 fireRate=null;
 nextFire = 0;
 waveRate = 20000;
 nextWave=0;
 wave = 14;
 bullets=null;
 badBullets=null;
 badAlive = [];
 badAlive2 = [];
 life = 10;
 boss=null;
 bossBool=false;
 bossLife = 15;
 spriteBossLife=null;
 score=null;
 scoreText=null;
 spriteLife=null;
 speedText=null; 
 proprietyText=null;
 waveText=null;
 rateText=null;
 timeLastText=null;
 weaponText=null;
 speed=null;
 propriety=null;
 rate=null;
 title=null;
 hearts=null;
 soundButton=null;
}

theGame.prototype = {
	create : function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//Variables
		back = this.game.add.tileSprite(0,0,1024,728,'back');
		spriteLife = this.game.add.sprite(1300,550,'spriteLife');
		wave = 0;
		score=0;
		life = 10;
		nextFire = this.game.time.now;
		nextWave=this.game.time.now;
		cursors = this.game.input.keyboard.createCursorKeys();

		//Text
		timeLastText = this.game.add.text(512, 650, "Time Left : " , { font: '30px Courrier New', fill: '#fff' });
		timeLastText.anchor.setTo(0.5,0);
		weaponText = this.game.add.text(512,680, "Your weapon : " , { font: '30px Courrier New', fill: '#fff' });
		weaponText.anchor.setTo(0.5,0);
		scoreText = this.game.add.text(25, 50, "Score : " , { font: '30px Courrier New', fill: '#fff' });
		waveText = this.game.add.text(25, 25, "Wave : " , { font: '30px Courrier New', fill: '#fff' });

		//Buttons
		if(song.paused) {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,0,1);
		}
		else {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,1,0);
		}

		//Groups
		hearts = this.game.add.group();
		bossHearts = this.game.add.group();
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
		bossBullets = this.game.add.group();
		bossBullets.enableBody = true;
		bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
		bossBullets.createMultiple(30, 'bullet', 0, false);
		
		//Luncher
		this.spawnPlayer();
		this.FnextWave();
	},
	
	update : function() {
		this.game.physics.arcade.overlap(bullets, bads, this.killBad, null , this);
		this.game.physics.arcade.overlap(bads, player, this.killPlayer, null , this);
		this.game.physics.arcade.overlap(badBullets, player, this.killPlayer, null , this);
		if(bossBool) {
			this.game.physics.arcade.overlap(bossBullets, player, this.killPlayer, null , this);
			this.game.physics.arcade.overlap(bullets, boss, this.hitBoss, null , this);	
		}
		back.tilePosition.y -= 1;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		player.rotation = this.game.physics.arcade.angleToPointer(player);
		bads.forEach(function(bad) {
			bad.rotation = game.physics.arcade.angleBetween(bad, player);  
		});
		
		if (cursors.left.isDown) {
			player.body.velocity.x -= 500;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x += 500;
		}
		if (cursors.up.isDown) {
		   player.body.velocity.y -= 500;
		}
		if (cursors.down.isDown) {
		  player.body.velocity.y += 500;
		}
		if (this.game.input.activePointer.isDown) {
			this.fire();
		}
		if(wave>=1 && wave<5) {
			bads.forEach(this.game.physics.arcade.moveToXY, this.game.physics.arcade, false, player.x, player.y, 100);
		}
		else if(wave>=5 && wave<10) {
			bads.forEach(this.game.physics.arcade.moveToXY, this.game.physics.arcade, false, player.x, player.y, 200);
		}
		else if(wave>=10 && wave<15) {
			bads.forEach(this.game.physics.arcade.moveToXY, this.game.physics.arcade, false, player.x, player.y, 300);
		}
		if(bossBool) {
			boss.rotation = this.game.physics.arcade.angleBetween(boss, player);
			if(this.game.physics.arcade.distanceBetween(boss, player) > 500) {
				this.game.physics.arcade.velocityFromRotation(boss.rotation, 400, boss.body.velocity);
			}
			else if (this.game.physics.arcade.distanceBetween(boss, player) < 400) {
				this.game.physics.arcade.velocityFromRotation(boss.rotation, -400, boss.body.velocity);
			}
			else {
				this.game.physics.arcade.velocityFromRotation(boss.rotation+3.14/2, 400, boss.body.velocity);
			}
		}
		if(this.game.time.now > nextWave || wave == 15) {
			this.FnextWave();
		}
		if(this.game.time.now > badNextFire) {
			this.badFire();
		}
		if(bossBool && this.game.time.now > bossNextFire) {
			this.bossFire();
		}
	},
		
	spawnPlayer : function() {
		player = this.game.add.sprite(512, 364, 'player');
		player.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		this.resetLife();
	},
	spawnBad : function() {
		var list_pos = new Array();
		list_pos.push({"x": 100, "y": -100});	
		list_pos.push({"x": 920, "y": -100});		
		list_pos.push({"x": 1124, "y": 628});		
		list_pos.push({"x": 512, "y": 828});		
		list_pos.push({"x": -110, "y": 630});
		list_pos.push({"x": -110, "y": 100});
		
		list_pos.forEach(function(posi){
			var rdm = this.game.rnd.integerInRange(1, 5);
			bads.create(posi["x"], posi["y"], 'bad'+rdm);
		});
			
		bads.forEach(function(bad) {
			bad.anchor.setTo(0.5,0.5);
			bad.scale.setTo(2,2);
		});
	},
	spawnBoss : function() {
		boss = this.game.add.sprite(100,100,'boss');
		this.game.physics.arcade.enable(boss);
		bossBool = true;
		this.resetBossLife();
	},
	resetLife : function() {
		hearts.removeAll();
		for(var i=0; i < life; i++) {
			hearts.create(950, 600-i*50, 'spriteLife');
		}	
	},
	resetBossLife : function() {
		bossHearts.removeAll();
		for(var i=0; i < bossLife; i++) {
			bossHearts.create(250+i*35, 150, 'spriteBossLife');
		}
	},
	bulletOut : function(bullet) {
		bullet.kill();
	},
	killBad : function(bullet, bad) {
		bad.kill();
		bullet.kill();
		score += 10;
	},
	hitBoss : function(boss, bullet) {
		bullet.kill();
		bossLife--;
		this.resetBossLife();
		if(bossLife < 1) {
			boss.kill();
			bossHearts.removeAll();
			bossBool = false;
			bossLife = 15;
			score += 10;
		}
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
			if(propriety != 3) {		
				var bullet = bullets.getFirstExists(false);
				bullet.checkWorldBounds = true;
				bullet.events.onOutOfBounds.add(this.bulletOut, this);
				bullet.reset(player.x, player.y);
				bullet.rotation = this.game.physics.arcade.angleToPointer(bullet);
				this.game.physics.arcade.velocityFromRotation(bullet.rotation, 300*speed, bullet.body.velocity);
				if(propriety == 2) {
					for(var i=-3.14/6; i <= 3.14/6; i+=6.28/6) {
						var bullet = bullets.getFirstExists(false);
						bullet.checkWorldBounds = true;
						bullet.events.onOutOfBounds.add(this.bulletOut, this);
						bullet.reset(player.x, player.y);
						bullet.rotation = this.game.physics.arcade.angleToPointer(bullet);
						this.game.physics.arcade.velocityFromRotation(bullet.rotation+i, 300*speed, bullet.body.velocity);
					}	
				}				
			}
			else {
				var bullet = bullets.getFirstExists(false);
				bullet.checkWorldBounds = true;
				bullet.events.onOutOfBounds.add(this.bulletOut, this);
				bullet.reset(player.x, player.y);
				bullet.rotation = this.game.physics.arcade.angleToPointer(bullet);
				this.game.physics.arcade.velocityFromRotation(this.game.rnd.integerInRange(1, 6) , 300*speed, bullet.body.velocity);	
			}
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
	bossFire : function() {
		var bossBullet = bossBullets.getFirstExists(false);
		bossBullet.checkWorldBounds = true;
		bossBullet.events.onOutOfBounds.add(this.bulletOut, this);
		bossBullet.reset(boss.body.x, boss.body.y);
		bossBullet.rotation = this.game.physics.arcade.angleBetween(bossBullet, player); 
		this.game.physics.arcade.moveToObject(bossBullet,player, 500);
		bossNextFire = this.game.time.now + bossFireRate;
	},
	FnextWave : function() {
		if(wave<15) {
			nextWave += waveRate;
			wave++;
			this.newWeapon();
			if(wave%5==0) {
				this.spawnBoss();
			}
			else if( wave < 16) {
				this.spawnBad();
			}
			else {
				this.gameWin();
			}
		}
		else {
			badAlive2.length=0;
			bads.forEachAlive(function(bad){
				badAlive2.push(bad);
			});
			if(bossBool == false && badAlive2.length == 0) {
				this.gameWin();
			}	
		}
	},
	newWeapon : function() {
		speed =  this.game.rnd.integerInRange(1, 3); 
		rate =  this.game.rnd.integerInRange(1, 3);
		propriety =  this.game.rnd.integerInRange(1, 3);
		switch(rate) {
			case 1:
				fireRate = 1500;
			break;
			case 2:
				fireRate = 750;
			break;
			case 3:
				fireRate = 500;
			break;
		}
	},
	gameOver : function() {
		this.game.state.start("GameOver");
	},
	gameWin : function() {
		this.game.state.start("GameWin");
	},
	soundChange : function() {
		if(song.paused) {
			soundButton.setFrames(1,0);
			song.resume();
		}
		else {
			soundButton.setFrames(0,1);
			song.pause();
		}
	},
	render : function() {
		switch(speed) {
			case 1:
				speedText = "Slow ";
			break;
			case 2:
				speedText = "Average ";
			break;
			case 3:
				speedText = "Fast ";
			break;	
		}
		switch(propriety) {
			case 1:
				proprietyText = "Normal ";
			break;
			case 2:
				proprietyText = "Triple ";
			break;
			case 3:
				proprietyText = "Useless ";
			break;	
		}
		switch(rate) {
			case 1:
				rateText = "Slow ";
			break;
			case 2:
				rateText = "Average ";
			break;
			case 3:
				rateText = "Rapide ";
			break;	
		}
		var weapon = speedText + proprietyText + rateText;
		timeLastText.setText("Time Left : " + Math.round((nextWave-this.game.time.now)/1000));
		weaponText.setText("Your weapon : " +weapon+"Fire Rate Kitty Cannon");
		scoreText.setText("Score : " +score);
		waveText.setText("Wave : " +wave);
		
		if(wave == 15) {
			timeLastText.visible = false;
		}
	}
}

