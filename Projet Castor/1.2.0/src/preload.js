var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(512,364,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		
		
		this.game.load.image('back', 'assets/img/back.png');
		this.game.load.image('player', 'assets/img/player.png');
		this.game.load.image('ledge', 'assets/img/ledge.png');
		this.game.load.image('spike1', 'assets/img/spike.png');
		this.game.load.image('spike2', 'assets/img/spike2.png');
		this.game.load.image('spike3', 'assets/img/spike3.png');
		this.game.load.image('spike4', 'assets/img/spike4.png');
		this.game.load.image('end', 'assets/img/end.png');
		this.game.load.image('bad1', 'assets/img/bad1.png');
		this.game.load.image('cannon', 'assets/img/cannon.png');
		this.game.load.image('bullet', 'assets/img/shoot.png');
		//this.game.load.spritesheet('play', 'assets/img/play.png',200,79);
	},
  	create: function(){
		this.game.state.start("TheGame");
	}
}