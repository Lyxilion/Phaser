
BasicGame.GameOver = function (game) {

};

BasicGame.GameOver.prototype = {

    create: function () {
		this.game.add.sprite(0,0,"background");
		
		var title = this.game.add.sprite(500,-100,'title');
		title.anchor.setTo(0.5,0.5);
		this.game.add.tween(title).to({ y: 100 },2000, Phaser.Easing.Elastic.InOut, true, 0);	
		var scoreText = this.game.add.text(500, 150, "" , { font: '30px Courrier New', fill: '#fff' });
		scoreText.setText(count);
		
		
		var playButton = this.game.add.button(500,500,"play",this.play,this,1,0)
		playButton.anchor.setTo(0.5,0.5);
		
		this.game.add.tween(playButton).to({ y: 275 },2000, Phaser.Easing.Elastic.InOut, true, 0);	
    },
	
	play : function () {
		this.game.state.start("Game");
	},
};
