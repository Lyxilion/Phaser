levelEditor = function(game){
	var sprite;
	var activeSprite;
	var activeGroup;
	var tableau = [];
}

levelEditor.prototype = {
  	create: function(){
		tableau = [];
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.add.sprite(0,0,"back");
		
		for (var x = 0; x < 25; x++) {
			this.game.add.sprite(x*40,0,"ledge");
		}
		for (var x = 0; x < 25; x++) {
			this.game.add.sprite(x*40,680,"ledge");
		}
		for (var y = 0; y < 18; y++) {
			this.game.add.sprite(0,y*40,"ledge");
		}
		for (var y = 0; y < 18; y++) {
			this.game.add.sprite(960,y*40,"ledge");
		}
		
		tableau[0]="none";
		
		this.game.add.button(10,10, 'spike1', this.tap.bind({'group' : 'spikes','name': 'spike1'}), this);
		this.game.add.button(60,10, 'spike2', this.tap.bind({'group' : 'spikes','name': 'spike2'}), this);
		this.game.add.button(110,10, 'spike3', this.tap.bind({'group' : 'spikes','name': 'spike3'}), this);
		this.game.add.button(160,10, 'spike4', this.tap.bind({'group' : 'spikes','name': 'spike4'}), this);
		this.game.add.button(210,10, 'ledge', this.tap.bind({'group' : 'legdes','name': 'ledge'}), this);
		this.game.add.button(260,10, 'cannon', this.tap.bind({'group' : 'cannons','name': 'cannon'}), this);
		
		this.game.add.button(500,500, 'end', this.start, this);
		activeGroup = "none";
		activeSprite = "none";
		this.game.input.onDown.add(this.click, this);
		
		
		
		
	},
	update : function(tab) {
		
		this.game.debug.text(activeSprite,100, 100);
		/*this.game.debug.text(tableau[0]["number"],100, 121);
		this.game.debug.text(tableau[0]["group"],100, 125);*/
		this.game.debug.text(this.game.time.now,100, 150);
	},
	
	tap : function () {
	
		activeSprite = this.name;
		activeGroup = this.group;
		
		
	},
	start : function() {
		this.game.state.start("TheGame", true, false, tableau);
		
	},
	click : function (pointer) {
		if(activeSprite != "none") {
			if(pointer.x >= 40 && pointer.y >= 40 && pointer.x < 960 && pointer.y < 680) {
				var x = pointer.x-(pointer.x%40);
				var y = pointer.y-(pointer.y%40);
					
				this.game.add.sprite(x, y, activeSprite);
				 
				this.game.debug.text(x,200, 200);
				this.game.debug.text(y,200, 225);
				
				var a = x/40;
				var b = y/40;
				
				a = a.toString();
				b = b.toString();
				if(a.length == 1 ) {
					a = "0"+a;
				}
				if(b.length == 1 ) {
					b = "0"+b;
				}
				tableau.push({"number" : a+b, "group" : activeGroup, "sprite" : activeSprite});
				
			}
		}
	},
	
}