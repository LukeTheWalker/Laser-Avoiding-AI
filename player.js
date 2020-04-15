let Player = function (brain) {
	this.x = 0
	this.y =  0
	this.alive = true
	this.brain = brain
	this.brain.score = 0	
	
	this.normalizeMovement = function (output) {
		/*if (res < 0.2 && res > 0)
			return 0
		else if (res < 0.4 && res > 0.2)
			return 1
		else if (res < 0.6 && res > 0.4)
			return 2
		else if (res < 0.8 && res > 0.6)
			return 3
		else if (res < 1 && res > 0.8)
			return 4*/
		/*if (res < 1/3 && res > 0)
			return 2
		else if (res < 2/3 && res > 1/3)
			return 3
		else if (res < 1 && res > 2/3)
			return 4*/
		let i = output.indexOf(Math.max(...output));
		if (i == 0)
			return 2
		else if (i == 1)
			return 3
		//else if (i == 2)
		//	return 4
		return;
	}
	this.move = function (output){ 
		let num = this.normalizeMovement(output)
		switch (num){
		  case 0:
			this.x--;
			break;
		  case 1:
			this.x++;
			break;
		  case 2:
			this.y--;
			break;
		  case 3:
			this.y++;
			break;
		  case 4:
			  break;
		}
		//this.x = this.x < 0 ? 0  : this.x  
		//this.x = this.x > board.llength-1 ? 0: this.x  
		//this.y = this.y < 0 ? 0  : this.y  
		//this.y = this.y > board.llength-1 ? board.llength-1 : this.y
	}
	
  	this.isDead = function (){
		if (this.x == board.laser[this.y] || this.y < 0 || this.y > board.llength-1){ 
			this.alive = false
			return true;
		}	
		else 
			return false
  	}
	
	this.reset = function() {
		this.x = 0
		this.y = 0
		this.alive = true
	}
	this.draw = function (i){
		document.getElementById("grid" + i + "slot" + String(this.y*columns+this.x)).style.backgroundColor = "blue";    
	}
	return this;
}