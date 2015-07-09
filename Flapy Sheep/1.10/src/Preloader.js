BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {
	preload: function () {
        var loadingBar = this.add.sprite(512,150,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.spritesheet('sheep', 'assets/img/sheep3.png',76,30);
		this.load.image('background', 'assets/img/back.png');
		this.load.image('pipe', 'assets/img/pipe2.png');
		this.load.image('title', 'assets/img/title.png');
		this.load.image('bound', 'assets/img/bound.png');
		this.game.load.spritesheet('play', 'assets/img/play.png',200,79);
	},
	update: function () {

			this.state.start('Title');
	}
};
