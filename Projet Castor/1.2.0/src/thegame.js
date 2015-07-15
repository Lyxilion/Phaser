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
}

theGame.prototype = {
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
	},
	
	spawnPlayer : function () {
		player = this.game.add.sprite(940,600,"player");
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		player.anchor.setTo(0.5,0.5);
		player.body.gravity.y = 1050;
	},
	
	spawn : function() {
		var list_pos = new Array();
		
		list_pos.push({"number": "1710", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1709", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1708", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1707", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1706", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1702", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1703", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1704", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1705", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1700", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1701", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1710", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1711", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1712", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1713", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1714", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1715", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1716", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1717", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1718", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1719", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1720", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1721", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1722", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1723", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1724", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1309", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1308", "group" : "ledges", "sprite": "ledge"});	
		list_pos.push({"number": "1310", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1311", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1312", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1411", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1511", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1611", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1209", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1208", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1108", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1012", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0912", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0913", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0914", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0915", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0916", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0917", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0918", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0919", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0920", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0921", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0922", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0923", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0924", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1017", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1117", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1217", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1317", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1417", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1517", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1016", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "1008", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0908", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0808", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0708", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0608", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0609", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0610", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0611", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0612", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0613", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0614", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0615", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "0515", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0415", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0315", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0215", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0115", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0015", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "0015", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0016", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0017", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0018", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0019", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0020", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0021", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0022", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0023", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0024", "group" : "ledges", "sprite": "ledge"});
		
		list_pos.push({"number": "0124", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0224", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0324", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0424", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0524", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0624", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0724", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "0824", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1024", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1124", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1224", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1324", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1424", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1524", "group" : "ledges", "sprite": "ledge"});
		list_pos.push({"number": "1624", "group" : "ledges", "sprite": "ledge"});
		
		
		list_pos.push({"number": "1011", "group" : "spikes", "sprite": "spike3"});
		list_pos.push({"number": "0911", "group" : "spikes", "sprite": "spike3"});
		
		list_pos.push({"number": "1116", "group" : "spikes", "sprite": "spike3"});
		list_pos.push({"number": "1216", "group" : "spikes", "sprite": "spike3"});
		list_pos.push({"number": "1316", "group" : "spikes", "sprite": "spike3"});
		list_pos.push({"number": "1416", "group" : "spikes", "sprite": "spike3"});
		list_pos.push({"number": "1516", "group" : "spikes", "sprite": "spike3"});
		
		
		
		list_pos.push({"number": "1013", "group" : "spikes", "sprite": "spike4"});
		list_pos.push({"number": "1014", "group" : "spikes", "sprite": "spike4"});
		list_pos.push({"number": "1015", "group" : "spikes", "sprite": "spike4"});

		
		list_pos.push({"number": "1109", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "1009", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "0909", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "0809", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "0709", "group" : "spikes", "sprite": "spike2"});
		
		list_pos.push({"number": "1612", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "1512", "group" : "spikes", "sprite": "spike2"});	
		list_pos.push({"number": "1412", "group" : "spikes", "sprite": "spike2"});	
		

		
		
		
		
		list_pos.push({"number" : "1312", "group" : "spikeTraps", "sprite": "spike1"});	
		list_pos.push({"number" : "1311", "group" : "spikeTraps", "sprite": "spike1"});	
		list_pos.push({"number" : "0912", "group" : "spikeTraps", "sprite": "spike1"});	
		list_pos.push({"number" : "0914", "group" : "spikeTraps", "sprite": "spike1"});	
		list_pos.push({"number" : "1714", "group" : "spikeTraps", "sprite": "spike1"});	
		list_pos.push({"number" : "1713", "group" : "spikeTraps", "sprite": "spike1"});	
		
		
		list_pos.push({"number": "1123", "group" : "cannons", "sprite": "cannon"});	
		list_pos.push({"number": "0217", "group" : "cannons", "sprite": "cannon"});	
		list_pos.push({"number": "0223", "group" : "cannons", "sprite": "cannon"});	
		
		
		
		list_pos.forEach(function(pos){
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
			
		});
		
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