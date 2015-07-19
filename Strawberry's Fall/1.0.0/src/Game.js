BasicGame.Game = function (game) {
	var player;
	var ledges;
	var ledges2;
	var ledges3;
	var score;
	var back;
	var compa;
	var cursors;
	var jetpack;
	var bool;
	var jetpackSpawn;
	var jetpackTime;
	var springs;
	var tremps;
	var scoreText;
};
BasicGame.Game.prototype = {
    create: function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		back = this.game.add.sprite(0,0,"back");
		this.game.camera.bounds = null;
		ledges = this.game.add.group();
		ledges.enableBody = true;
		ledges.physicsBodyTypes = Phaser.Physics.ARCADE;
		ledges2 = this.game.add.group();
		ledges2.enableBody = true;
		ledges2.physicsBodyTypes = Phaser.Physics.ARCADE;
		ledges3 = this.game.add.group();
		ledges3.enableBody = true;
		ledges3.physicsBodyTypes = Phaser.Physics.ARCADE;
		scoreText = this.game.add.text(25, 25, "" , { font: '30px Courrier New', fill: '#000' });
		springs = this.game.add.group();
		springs .enableBody = true;
		springs .physicsBodyTypes = Phaser.Physics.ARCADE;
		tremps = this.game.add.group();
		tremps.enableBody = true;
		tremps.physicsBodyTypes = Phaser.Physics.ARCADE;
		bool = true;
		jetpackTime = this.game.time.now;
		cursors = this.game.input.keyboard.createCursorKeys();
		jetpackSpawn = -10000;
		compa = this.game.camera.y;
		score = this.game.camera.y;
		this.spawnPlayer();
		this.spawnLedge();
		this.loadLedge();
    },
    update: function () {
		this.game.physics.arcade.overlap(player, ledges, this.jump, null , this);
		this.game.physics.arcade.overlap(player, ledges3, this.jump, null , this);
		this.game.physics.arcade.overlap(player, ledges2, this.killLedge2, null , this);
		this.game.physics.arcade.overlap(player, springs, this.spring, null , this);
		this.game.physics.arcade.overlap(player, tremps, this.tremp, null , this);
		if(!bool) { this.game.physics.arcade.overlap(player, jetpack, this.jetpack, null , this); }
		score = - this.game.camera.y;
		if(this.game.camera.y < compa) {
			this.spawnLedge(this.game.camera.y);
			compa = this.game.camera.y -100;
		]
		if(player.body.velocity.y < 0 ) {
			player.frame = 0;
		}
		else {
			player.frame = 1;
		}
		if(player.y -350 < this.game.camera.y) {
			this.game.camera.y = player.y-350;
			back.y = player.y-350;
			scoreText.y = player.y-325;
		}
		if(this.game.physics.arcade.distanceBetween(this.game.camera,player) > 800) {
			this.killPlayer();
		}
		if(this.game.camera.y > jetpackSpawn) {
			jetpackSpawn = jetpackSpawn*2;
		}
		if(jetpackTime > this.game.time.now) {
			player.body.velocity.y = -1000;
		}
		if(player.x > 368) {
			player.x = 0;
		}
		if(player.x <0) {
			player.x = 368;
		}
		if (cursors.left.isDown && player.body.velocity.x > -200) {
			player.body.velocity.x -= 10;
		}
		else if (cursors.right.isDown && player.body.velocity.x < 200) {
			player.body.velocity.x += 10;
		}
		if(this.game.physics.arcade.distanceBetween(ledges.getAt(0),player) > 500) {
			ledges.getAt(0).destroy();
		}
		if(this.game.physics.arcade.distanceBetween(ledges2.getAt(0),player) > 500) {
			ledges2.getAt(0).destroy();
		}
		if(this.game.physics.arcade.distanceBetween(ledges3.getAt(0),player) > 500) {
			ledges3.getAt(0).destroy();
		}
		scoreText.setText("score : " + score);	
    },
	spawnPlayer : function() {
		player = this.game.add.sprite(368/2,350,'player');
		ledges.create(368/2,400, "ledge");
		player.anchor.setTo(0.5,0.5);
		this.game.physics.arcade.enable(player);
		player.body.gravity.y = 600;
	},
	jump : function() {
		player.body.velocity.y = -375;
	},
	killLedge2 : function(n,ledge) {
		ledge.kill();
	},
	loadLedge : function() {
		for(var i = 0; i < 20; i++) {
			var x = this.game.rnd.integerInRange(10, 318);
			ledges.create(x,i*50, "ledge");
		}
	},
	spawnLedge : function(y) {
		var x = this.game.rnd.integerInRange(10, 318);
		var rnd = this.game.rnd.integerInRange(0, 9);		
		if(this.game.camera.y < jetpackSpawn) {
			ledges.create(x,y, "ledge");
			jetpack = this.game.add.sprite(x,y-40,'jetpack');
			this.game.physics.arcade.enable(jetpack);
			bool = false;
		} 
		else {
			if(rnd < 3) {
				var ledge = ledges3.create(10,y, "ledge3");
				this.game.add.tween(ledge)
				.to({ x: ledge.x +300}, 4000)
				.to({ x: ledge.x }, 4000)
				.loop().start();
			}
			else {
				ledges.create(x,y, "ledge");
				var rnd = this.game.rnd.integerInRange(0, 100);
				if(rnd <10) {
					tremps.create(x,y-10,'tremp')
				}
				else if(rnd > 80) {
					springs.create(x,y-10,'spring')
				}	
			
				if(rnd > 6) {
					var x = this.game.rnd.integerInRange(10, 318);
					ledges2.create(x,y, "ledge2");
				}
			}	
		}
	},
	killPlayer : function() {
		this.game.state.start("GameOver");
	},	
	jetpack : function() {
		jetpackTime = this.game.time.now+2000;
	},
	tremp : function() {
		player.body.velocity.y = -2000;
	},
	spring : function() {
		player.body.velocity.y = -1000;
	}
};