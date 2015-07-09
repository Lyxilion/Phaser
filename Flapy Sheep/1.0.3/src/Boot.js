var BasicGame = {};
BasicGame.Boot = function (game) {
};
BasicGame.Boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/img/loadingBar.png"); 
	},
    create: function () {
		this.state.start('Preloader');
    }
};
