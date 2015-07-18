 theGame = function(game){
 var player;
 var ledges;
 var cursor;
 var sol;
 var spikes;
 var skipeTraps;
 var end;
 var respawnTime;
 var cannonTime;
 var cannons;
 var cannonBullets;
 var grid = [];
}

theGame.prototype = {
	init: function(tableau) {
		grid = tableau;
		this.game.debug.text(tableau[0]["number"],100, 121)
	},
	
	create : function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.add.sprite(0,0,"back");
		respawnTime = this.game.time.now;
		cannonTime = this.game.time.now;
		sol = false;
		//GROUPS	
		spikeTraps = this.game.add.group();
		spikeTraps.enableBody = true;
		spikeTraps.physicsBodyType = Phaser.Physics.ARCADE;
		
		ledges = this.game.add.group();
		ledges.enableBody = true;
		ledges.physicsBodyType = Phaser.Physics.ARCADE;
		
		spikes = this.game.add.group();
		spikes.enableBody = true;
		spikes.physicsBodyType = Phaser.Physics.ARCADE;
		
		cannons = this.game.add.group();
		cannons.enableBody = true;
		cannons.physicsBodyType = Phaser.Physics.ARCADE;
		
		cannonBullets = this.game.add.group();
		cannonBullets.enableBody = true;
		cannonBullets.physicsBodyType = Phaser.Physics.ARCADE;
		
		//end
		end = this.game.add.sprite(900,310,"end");
		this.game.physics.arcade.enable(end);
		end.body.immovable = true;
		
		//functions
		this.spawnPlayer();
		this.spawn();
		
		grid = [];
		
		cursors = game.input.keyboard.createCursorKeys();
	},
	
	
	update : function() {
		this.game.physics.arcade.collide(spikeTraps, player, this.traps, null, this);
		this.game.physics.arcade.collide(player, ledges, this.land);
		this.game.physics.arcade.overlap(player, spikes, this.killPlayer, null, this);		
		this.game.physics.arcade.overlap(player, end, this.gameWin, null, this);
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
			player.body.velocity.y = -650;
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
		
		//this.game.debug.text(tableau[0]["number"],100, 121);
		//this.game.debug.text(tableau[0]["group"],100, 125);
	},
	
	spawnPlayer : function () {
		player = this.game.add.sprite(940,600,"player");
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		player.anchor.setTo(0.5,0.5);
		player.body.gravity.y = 1050;
	},
	
	spawn : function() {
		
		
		/*
		grid.forEach(function(pos){
			var y = pos["number"].slice(0,2);
			var x = pos["number"].slice(2,4);
			
			switch (pos["group"]) {
				case "spikes" :
					spikes.create(x*40, y*40, pos["sprite"]);
				break;
				case "ledges" :
					ledges.create(x*40, y*40, pos["sprite"]);
				break;
				case "cannons" :
					cannons.create(x*40, y*40, pos["sprite"]);
				break;
				case "spikeTraps" :
					spikeTraps.create(x*40, y*40, pos["sprite"]);
				break;
			}
			
		});*/
		
		ledges.forEachAlive(function(ledge) {
			ledge.body.immovable = true;
		});
		spikeTraps.forEachAlive(function(spikeTrap) {
			spikeTrap.body.immovable = true;
		});
		
		cannons.forEach(function(cannon) {
			cannon.anchor.setTo(0.5,0.5);
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
            .to({ y: spikeTraps.y - 40 }, 500)
            .to({ y: spikeTraps.y }, 1000)
            .start();
  		
		this.killPlayer();
	},
	gameWin : function() {
		player.kill();
	},
}