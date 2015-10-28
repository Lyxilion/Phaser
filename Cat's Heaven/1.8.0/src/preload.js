var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(512,364,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.image('back', 'assets/img/back.png');
		this.game.load.image('RandomBeaverGameStudio', 'assets/img/RandomBeaverGameStudio.png');
		this.game.load.image('intro', 'assets/img/intro.png');
		this.game.load.image('player', 'assets/img/player.png');
		this.game.load.image('bullet', 'assets/img/shoot.png');
		this.game.load.image('cat', 'assets/img/cat.png');
		this.game.load.image('boss', 'assets/img/boss.png');
		this.game.load.image('shootBoss', 'assets/img/shootBoss.png');
		this.game.load.image('spriteBossLife', 'assets/img/bossLife.png');
		this.game.load.audio('song', 'assets/music/song.mp3');
		this.game.load.image('bad1', 'assets/img/bad1.png');
		this.game.load.image('bad2', 'assets/img/bad2.png');
		this.game.load.image('bad3', 'assets/img/bad3.png');
		this.game.load.image('bad4', 'assets/img/bad4.png');
		this.game.load.image('bad5', 'assets/img/bad5.png');
		this.game.load.image('title', 'assets/img/title.png');
		this.game.load.image('win', 'assets/img/win.png');
		this.game.load.image('over', 'assets/img/over.png');
		this.game.load.spritesheet('sound', 'assets/img/sound.png',20,23);
		this.game.load.spritesheet('play', 'assets/img/play.png',200,79);
		this.game.load.spritesheet('kaboum', 'assets/img/boum.png',24,24);
		this.game.load.image('spriteLife', 'assets/img/life.png');
		this.game.load.audio('explosion', 'assets/sound/boum.wav');
		this.game.load.audio('shoot', 'assets/sound/shoot.wav');
		this.game.load.audio('shootBossSound', 'assets/sound/shootBoss.wav');
	},
  	create: function(){
		this.game.state.start("Intro");
	}
}