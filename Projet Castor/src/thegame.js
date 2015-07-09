 theGame = function(game){
 var player;
 var ledge;
 var cursor;
 var sol;
 var spikes;
 var end;
 var bads;
}

theGame.prototype = {
	create : function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.add.sprite(0,0,"back");
		
		//GROUPS
		ledge = this.game.add.sprite(0,718, "ledge");
		this.game.physics.arcade.enable(ledge);
		ledge.body.immovable = true;
		
		spikes = this.game.add.group();
		spikes.enableBody = true;
		spikes.physicsBodyType = Phaser.Physics.ARCADE;
		
		bads = this.game.add.group();
		bads.enableBody = true;
		bads.physicsBodyType = Phaser.Physics.ARCADE;
		
		//end
		end = this.game.add.sprite(900,668,"end");
		this.game.physics.arcade.enable(end);
		end.body.immovable = true;
		
		//functions
		this.spawnPlayer();
		this.spawnBad();
		this.spawnSpike();
		cursors = game.input.keyboard.createCursorKeys();
	},
	
	
	update : function() {
		this.game.physics.arcade.collide(player, ledge, this.land);
		this.game.physics.arcade.collide(bads, ledge, this.resetBad, null, this);
		this.game.physics.arcade.overlap(player, spikes, this.killPlayer, null, this);
		this.game.physics.arcade.overlap(player, end, this.gameWin, null, this);
		this.game.physics.arcade.overlap(player, bads, this.killPlayer, null, this);
		player.body.velocity.x = 0;
		if (cursors.left.isDown) {
			player.body.velocity.x = -200;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x = 200;
		}
		if(cursors.up.isDown && sol) {
			player.body.velocity.y = -400;
			sol = false;
		}
		
	},
	
	spawnPlayer : function () {
		player = this.game.add.sprite(100,100,"player");
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds=true;
		player.body.gravity.y = 600;
	},
	spawnBad : function() {
		var bad = bads.create(570,100,"bad1");
		bad.body.gravity.y = 600;

		bad = bads.create(10,50,"bad1");
		bad.body.gravity.y = 600;
	
	},
	spawnSpike : function() {
		spikes.create(500,668,"spike");	
		spikes.create(250,668,"spike");
	},
	land : function() {
		sol = true;
	},
	killPlayer : function() {
		player.kill();
	},
	gameWin : function() {
		player.kill();
	},
	resetBad : function(n,bad) {
		bad.y = 200;
		bad.body.gravity.y = 600;

	},
	render : function() {
		
	}
}

