var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(512,364,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.image('back', 'assets/img/back.png');
		this.game.load.image('player', 'assets/img/awp2.png');
		this.game.load.image('bullet', 'assets/img/table.png');
		this.game.load.image('cat', 'assets/img/bread.png');
		this.game.load.image('thorin', 'assets/img/thorin.png');
		this.game.load.image('heart', 'assets/img/heart.png');
		this.game.load.image('title', 'assets/img/title.png');
		this.game.load.image('kill', 'assets/img/kill.png');
		this.game.load.spritesheet('kaboom', 'assets/img/burst.png',64,64);
		this.game.load.image('help', 'assets/img/help.png');
		this.game.load.image('next', 'assets/img/next.png');
		this.game.load.image('panel1', 'assets/img/panel1.png');
		this.game.load.image('panel2', 'assets/img/panel2.png');
		this.game.load.image('disclaimer', 'assets/img/disclaimer.png');
		this.game.load.image('tutorial', 'assets/img/tutorial.png');
		this.game.load.image('win', 'assets/img/win.png');
		this.game.load.image('over', 'assets/img/over.png');
		this.game.load.image('t1', 'assets/img/t1.png');
		this.game.load.image('t2', 'assets/img/t2.png');
		this.game.load.image('t3', 'assets/img/t3.png');
		this.game.load.image('t4', 'assets/img/t4.png');
		this.game.load.image('play', 'assets/img/play.png');
		this.game.load.spritesheet('spriteLife', 'assets/img/life2.png',64,64);
	},
  	create: function(){
		this.game.state.start("Disclaimer");
	}
}