var intro = function(game){
var startTime;
}

intro.prototype = {
  	create: function(){
		var logo = this.game.add.sprite(0,0,"intro");
	logo.alpha = 0;
	game.add.tween(logo).to({alpha:1 },2500,Phaser.Easing.Quadratic.In, true, 0, 0,true);
	startTime = this.game.time.now;
	},
	update: function(){
		if(this.game.time.now > startTime+5500) {
			this.game.state.start("GameTitle");
		}
	},
}