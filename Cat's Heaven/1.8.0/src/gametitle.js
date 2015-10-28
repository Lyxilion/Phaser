var gameTitle = function(game){
	soundButton=null;
}

gameTitle.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'back');
		this.game.add.sprite(15,664,'RandomBeaverGameStudio');
		
		var gameTitle = this.game.add.sprite(512,-200,"title");
		gameTitle.anchor.setTo(0.5,0);
		
		soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,1,0);
		
		game.add.tween(gameTitle).to({ y: 30 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		var playButton = this.game.add.button(512,900,"play",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		
		game.add.tween(playButton).to({ y: 364 },2000, Phaser.Easing.Elastic.InOut, true, 0);	
	
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 675, 694);
		this.game.debug.text("For LudumDare #32 v1.8", 675, 710);
		
		song= this.game.add.audio('song',0.15, true);
		song.play();
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	soundChange : function() {
		if(song.paused) {
			soundButton.setFrames(1,0);
			song.resume();
		}
		else {
			soundButton.setFrames(0,1);
			song.pause();
		}
	}
}