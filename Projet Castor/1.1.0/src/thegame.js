 theGame = function(game){
 var player;
 var ledges;
 var cursor;
 var sol;
 var spikes;
 var skipeTraps;
 var end;
 var bads;
 var respawnTime;
 var cannonTime;
 var cannons;
 var cannonBullets;
}

theGame.prototype = {
	create : function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.add.sprite(0,0,"back");
		respawnTime = this.game.time.now;
		cannonTime = this.game.time.now;
		sol = false;
		//GROUPS
		/*ledge = this.game.add.sprite(0,718, "ledge");
		this.game.physics.arcade.enable(ledge);
		ledge.body.immovable = true;*/
		
		ledges = this.game.add.group();
		ledges.enableBody = true;
		ledges.physicsBodyType = Phaser.Physics.ARCADE;
		
		
		
		
		spikes = this.game.add.group();
		spikes.enableBody = true;
		spikes.physicsBodyType = Phaser.Physics.ARCADE;
		
		spikeTraps = this.game.add.group();
		spikeTraps.enableBody = true;
		spikeTraps.physicsBodyType = Phaser.Physics.ARCADE;
		
		bads = this.game.add.group();
		bads.enableBody = true;
		bads.physicsBodyType = Phaser.Physics.ARCADE;
		
		cannons = this.game.add.group();
		cannons.enableBody = true;
		cannons.physicsBodyType = Phaser.Physics.ARCADE;
		
		cannonBullets = this.game.add.group();
		cannonBullets.enableBody = true;
		cannonBullets.physicsBodyType = Phaser.Physics.ARCADE;
		
		//end
		end = this.game.add.sprite(550,134,"end");
		this.game.physics.arcade.enable(end);
		end.body.immovable = true;
		
		//functions
		//this.spawnSpikeTrap();
		this.spawnLedge();
		this.spawnPlayer();
		this.spawnBad();
		this.spawnSpike();
		this.spawnCannon();
		
		cursors = game.input.keyboard.createCursorKeys();
	},
	
	
	update : function() {
		this.game.physics.arcade.collide(player, ledges, this.land);
		this.game.physics.arcade.collide(bads, ledges, this.resetBad, null, this);
		this.game.physics.arcade.overlap(player, spikes, this.killPlayer, null, this);
		this.game.physics.arcade.overlap(spikeTraps, player, this.traps, null, this);
		this.game.physics.arcade.overlap(player, end, this.gameWin, null, this);
		this.game.physics.arcade.overlap(player, bads, this.killPlayer, null, this);
		this.game.physics.arcade.overlap(player, cannonBullets, this.killPlayer, null, this);
		this.game.physics.arcade.overlap(ledges, cannonBullets, this.killBullets, null, this);
		
		player.body.velocity.x = 0;
		
		if (cursors.left.isDown) {
			player.body.velocity.x = -300;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x = 300;
		}
		if(cursors.up.isDown && sol) {
			player.body.velocity.y = -500;
			sol = false;
		}
		
		cannons.forEach(function(cannon) {
			cannon.rotation = game.physics.arcade.angleBetween(cannon, player);  
		});
		
		if(respawnTime < this.game.time.now && player.alive == false) {
			this.spawnPlayer();
		}
		if(cannonTime < this.game.time.now) {
			this.cannonFire();
		}
		
	},
	
	spawnPlayer : function () {
		player = this.game.add.sprite(450,134,"player");
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		player.anchor.setTo(0.5,0.5);
		player.body.gravity.y = 600;
	},
	spawnLedge : function () {
		var list_pos = new Array();
		list_pos.push({"x": 0, "y": 718,"type": 1});	
		list_pos.push({"x": 0, "y": 0,"type": 1});	
		list_pos.push({"x": 0, "y": 0,"type": 2});	
		list_pos.push({"x": 1014, "y": 0,"type": 2});	
		list_pos.push({"x": 512, "y": 0,"type": 3});	
		list_pos.push({"x": 258, "y": 184 ,"type": 4});	
		list_pos.push({"x": 258, "y": 552 ,"type": 4});	
		list_pos.push({"x": 0, "y": 368,"type": 5});	
		list_pos.push({"x": 766, "y": 368,"type": 5});	
		
		
		list_pos.forEach(function(posi){
			ledges.create(posi["x"], posi["y"], 'ledge'+posi["type"]);
			
		});
			
		ledges.forEachAlive(function(ledge) {
			ledge.body.immovable = true;
		});	
	},
	spawnBad : function() {
		var list_pos = new Array();
		list_pos.push({"x": 166, "y": 378});	
		list_pos.push({"x": 814, "y": 378});	
	
		
		
		list_pos.forEach(function(posi){
			bads.create(posi["x"], posi["y"], 'bad1');
		});
			
		bads.forEach(function(bad) {
			bad.body.gravity.y = 600;
		});	
	},
	spawnCannon : function() {
		var list_pos = new Array();
		list_pos.push({"x": 50, "y": 50});	
		list_pos.push({"x": 974, "y": 50});	
		
		list_pos.forEach(function(posi){
			cannons.create(posi["x"], posi["y"], 'cannon');
		});
		cannons.forEach(function(cannon) {
			cannon.anchor.setTo(0.5,0.5);
		});	
	},
	spawnSpike : function() {
		
		
		var list_pos = new Array();
		list_pos.push({"x": 492, "y": 668,"type": 1});	
		list_pos.push({"x": 218, "y": 668,"type": 1});	
		list_pos.push({"x": 766, "y": 668,"type": 1});	
			
		list_pos.push({"x": 430, "y": 502,"type": 1});	
		list_pos.push({"x": 388, "y": 502,"type": 1});	
		list_pos.push({"x": 346, "y": 502,"type": 1});
		
		list_pos.push({"x": 564, "y": 502,"type": 1});
		list_pos.push({"x": 606, "y": 502,"type": 1});
		list_pos.push({"x": 648, "y": 502,"type": 1});
		
		list_pos.push({"x": 218, "y": 318,"type": 1});
		list_pos.push({"x": 176, "y": 318,"type": 1});

		list_pos.push({"x": 472, "y": 194,"type": 4});		
		list_pos.push({"x": 430, "y": 194,"type": 4});		
		list_pos.push({"x": 388, "y": 194,"type": 4});		
		list_pos.push({"x": 346, "y": 194,"type": 4});		
		list_pos.push({"x": 304, "y": 194,"type": 4});		
		
		list_pos.push({"x": 522, "y": 194,"type": 4});
		list_pos.push({"x": 564, "y": 194,"type": 4});
		list_pos.push({"x": 606, "y": 194,"type": 4});
		list_pos.push({"x":	648, "y": 194,"type": 4});
		list_pos.push({"x": 690, "y": 194,"type": 4});
		list_pos.push({"x": 732, "y": 194,"type": 4});
		
		list_pos.push({"x": 462, "y": 318,"type": 3});		
		list_pos.push({"x": 462, "y": 276,"type": 3});		
		list_pos.push({"x": 522, "y": 276,"type": 2});		
		
		list_pos.forEach(function(posi){
			spikes.create(posi["x"], posi["y"], 'spike'+posi["type"]);
		});
	},
	
	spawnSpikeTrap : function() {
		var list_pos = new Array();
		list_pos.push({"x": 570, "y": 717});	
		list_pos.push({"x": 50, "y": 717});		
		
		list_pos.forEach(function(posi){
			spikeTraps.create(posi["x"], posi["y"], 'spike');
		});
	},
	cannonFire : function() {
		cannons.forEachAlive(function(cannon){
			var cannonBullet = cannonBullets.create(cannon.x, cannon.y, "bullet");
			cannonBullet.anchor.setTo(0.5,0.5);
			cannonBullet.rotation = this.game.physics.arcade.angleBetween(cannonBullet, player); 
			this.game.physics.arcade.moveToObject(cannonBullet,player,500);
		});
		cannonTime = this.game.time.now + 4000;
	},
	land : function() {
		sol = true;
	},
	killPlayer : function() {
		player.kill();
		respawnTime = this.game.time.now + 500;
		
	},
	killBullets : function(n,bullet) {
		bullet.kill();
	},
	traps : function(player, spikeTraps) {
        this.game.add.tween(spikeTraps)
            .to({ y: spikeTraps.y - 50 }, 500)
            .to({ y: spikeTraps.y }, 1000)
            .start();
  		
		this.killPlayer();
	},
	gameWin : function() {
		player.kill();
	},
	resetBad : function(bad,n) {
		bad.y = 378;
		bad.body.gravity.y = 600;

	},
	render : function() {
		
	}
}

