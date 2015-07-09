var gameTitle = function(game){
}

gameTitle.prototype = {
  	create: function(){
		game.add.tween(gameTitle).to({ y: 30 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		var playButton = this.game.add.button(512,900,"play",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		
		game.add.tween(playButton).to({ y: 364 },2000, Phaser.Easing.Elastic.InOut, true, 0);	
	
		
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
}