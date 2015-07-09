var text = function(game){
}

text.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'panel2');
		
		var t1= this.game.add.sprite(1524,100,"t1");
		var t2= this.game.add.sprite(-500,200,"t2");
		var t3= this.game.add.sprite(1524,300,"t3");
		var t4= this.game.add.sprite(-500,400,"t4");
		t1.anchor.setTo(0.5,0.5);
		t2.anchor.setTo(0.5,0.5);
		t3.anchor.setTo(0.5,0.5);
		t4.anchor.setTo(0.5,0.5);
		
		game.add.tween(t1).to({ x: 512}, 2000, Phaser.Easing.Linear.None, true, 0);
		game.add.tween(t2).to({ x: 512}, 2000, Phaser.Easing.Linear.None, true, 1000);
		game.add.tween(t3).to({ x: 512}, 2000, Phaser.Easing.Linear.None, true, 2000);
		game.add.tween(t4).to({ x: 512}, 2000, Phaser.Easing.Linear.None, true, 3000);
		
		var playButton = this.game.add.button(850,550,"play",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(2,2);
	
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 716);	
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
}