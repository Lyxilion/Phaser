var gameWin = function(game){
	soundButton=null;
}

gameWin.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'back');
			
		var gameWin = this.game.add.sprite(512,-200,"win");
		gameWin.anchor.setTo(0.5,0);
		
		if(song.paused) {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,0,1);
		}
		else {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,1,0);
		}
		
		game.add.tween(gameWin).to({ y: 30 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		var scoreWin=game.add.text(512, 100, "Score : " + score, { font: '30px Courrier New', fill: '#fff' });
		scoreWin.anchor.setTo(0.5,0);
		var playButton = this.game.add.button(512,900,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		
		game.add.tween(playButton).to({ y: 364 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 700);
		this.game.debug.text("For LudumDare #32 v1.6", 700, 716);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
}