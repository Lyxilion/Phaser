var gameOver = function(game){
	soundButton=null;
}

gameOver.prototype = {
  	create: function(){
		this.game.add.sprite(0,0,'back');
			
		var gameOver = this.game.add.sprite(512,-200,"over");
		gameOver.anchor.setTo(0.5,0);
		
		if(song.paused) {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,0,1);
		}
		else {
			soundButton = this.game.add.button(974,30,"sound",this.soundChange,this,1,0);
		}
		game.add.tween(gameOver).to({ y: 30 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		var scoreWin=game.add.text(512, 100, "Score : " + score, { font: '30px Courrier New', fill: '#fff' });
		scoreWin.anchor.setTo(0.5,0);
		var playButton = this.game.add.button(512,900,"play",this.playTheGame,this,1,0);
		playButton.anchor.setTo(0.5,0.5);
		
		game.add.tween(playButton).to({ y: 364 }, 2000, Phaser.Easing.Elastic.InOut, true, 0);
		
		this.score();
		
		this.game.debug.text("Made by @Lyxilion - OpenMy-Dev.net", 700, 700);
		this.game.debug.text("For LudumDare #32 v1.6", 700, 716);
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
	},
	score : function() {
		
		var sSaveUserName  = GJAPI.sUserName;
        var sSaveUserToken = GJAPI.sUserToken;
		if (GJAPI.sUserName) {
			GJAPI.UserLoginManual(sSaveUserName, sSaveUserToken);
			GJAPI.ScoreAdd(63927, score, score + " points");
		}
		else {
			GJAPI.ScoreAddGuest(63927, score, score + " points", "Guest");
		}		
	}
}