var gameTitle = function(game){
}

gameTitle.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'panel1');
		
		var bread = this.game.add.sprite(1024,100,"help");
			
		game.add.tween(bread).to({ x: 400}, 2000, Phaser.Easing.Linear.None, true, 0);
		
		var playButton = this.game.add.button(850,550,"next",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(2,2);
		
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 716);
	},
	playTheGame: function(){
		this.game.state.start("Text");
	},
}