BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};
BasicGame.Preloader.prototype = {
	preload: function () {
		this.game.load.image("back","assets/img/back.png");
		this.game.load.image("ledge","assets/img/ledge.png");
		this.game.load.image("ledge2","assets/img/ledge2.png");
		this.game.load.image("ledge3","assets/img/ledge3.png");
		this.game.load.image("jetpack","assets/img/jetpack.png");
		this.game.load.image("spring","assets/img/spring.png");
		this.game.load.image("tremp","assets/img/tremp.png");
		this.game.load.image("title","assets/img/title.png");
		this.game.load.spritesheet('play', 'assets/img/play.png',200,79);
		this.game.load.spritesheet('player', 'assets/img/player.png',40,40);
	},
	update: function () {
		this.state.start('Title');
	}
};
