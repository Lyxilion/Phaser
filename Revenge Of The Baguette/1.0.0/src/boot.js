var boot = function(game){
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/img/loadingBar.png"); 
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
		this.game.state.start("Preload");
	}
}