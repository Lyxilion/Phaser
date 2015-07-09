var gameOver = function(game){
}

gameOver.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'back');
			
		var gameOver = this.game.add.sprite(512,-200,"over");
		gameOver.anchor.setTo(0.5,0);
		gameOver.scale.setTo(2,2);
		
		game.add.tween(gameOver).to({ y: 30 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		var scoreWin=game.add.text(512, 250, "Score : " + score, { font: '30px Courrier New', fill: '#f4ffad' });
		scoreWin.anchor.setTo(0.5,0);
		var playButton = this.game.add.button(512,900,"play",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(2,2);
		game.add.tween(playButton).to({ y: 364 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 716);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
}