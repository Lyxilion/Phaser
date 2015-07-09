var tutorial = function(game){
}

tutorial.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'tutorial');
		
		var playButton = this.game.add.button(850,550,"next",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(2,2);
		
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 716);
	},
	playTheGame: function(){
		this.game.state.start("GameTitle");
	},
}