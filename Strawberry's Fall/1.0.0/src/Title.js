BasicGame.Title = function (game) {
};
BasicGame.Title.prototype = {
    create: function () {
		this.game.add.sprite(0,0,"back");
		var title = this.game.add.sprite(368/2,-100,'title');
		title.anchor.setTo(0.5,0.5);
		this.game.add.tween(title).to({ y: 100 },2000, Phaser.Easing.Elastic.InOut, true, 0);
		var playButton = this.game.add.button(368/2,850,"play",this.play,this,1,0)
		playButton.anchor.setTo(0.5,0.5);
		this.game.add.tween(playButton).to({ y: 550 },2000, Phaser.Easing.Elastic.InOut, true, 0);
    },
	play : function () {
		this.game.state.start("Game");
	},
};
