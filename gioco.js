class Board {
	constructor(col){
		this.llength = col
		this.round = col
		this.laser = []
		this.poses = [1,5,3,1,7,2,8,7,1,4,8,9,3,7,1]
	}
	
	draw (i){
		this.laser.forEach( (x, y) =>{
			if (x != this.llength) {
				/*
				if (document.getElementById("grid" + i + "slot" + String(x + y*columns)) == null)
					console.log(("grid" + i + "slot" + String(x + y*columns)))
				*/
				document.getElementById("grid" + i + "slot" + String(x + y*columns)).style.backgroundColor = "red";    
			}
		})
	}
	
	
	initLaser(){
		this.laser = []
		for (var i = 0; i < this.llength; i++){
			this.laser.push(this.llength)
		}
	}

	createLaser (){
		//var pos = Math.floor(Math.random() * this.llength);    
		//var pos = 4
		//while (this.laser[pos] != this.llength) pos = Math.floor(Math.random() * this.llength);
		var pos = this.poses[Math.floor(cnt / this.round)]
		for (var i = 0; i < this.laser.length; i++) if (i != pos ) this.laser[i] = this.llength-1
		//this.laser[pos] = this.llength-1
	}

	advanceLaser (){
		for (var i = 0; i < this.laser.length; i++){
			if (this.laser[i] != this.llength) this.laser[i]--	
			if (this.laser[i] < 0) this.laser[i] = this.llength
		}
	}
	normLaser () {
		var norm = new Array(this.llength)
		for (var i = 0; i < this.laser.length; i++)
			norm[i] = this.laser[i] / this.llength
		return norm;
	}
	
	clone () {
		return new Board (this.llength)
	}
}

class Player {
	constructor(){
		this.x = 0
		this.y =  0
		this.alive = true
	}
	
	move(num){ 
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
		this.x = this.x < 0 ? board.llength-1  : this.x  
		this.x = this.x > board.llength-1 ? 0: this.x  
		this.y = this.y < 0 ? board.llength-1  : this.y  
		this.y = this.y > board.llength-1 ? 0 : this.y
	}
	
  	isDead (){
		if (this.x == board.laser[this.y]){ 
			this.alive = false
			return true;
		}	
		else 
			return false
  	}
	
	reset () {
		this.x = 0
		this.y = 0
		this.alive = true
	}
	draw (i){
		document.getElementById("grid" + i + "slot" + String(this.y*columns+this.x)).style.backgroundColor = "blue";    
	}
	clone () {
		return new Player ();
	}
}

var player = new Player()
var board = new Board (columns)

function run(){
	var cnt=0;
	var pIsDead;
	board.initLaser(); 
	var cycle = setInterval( frame, speed) 
	function frame () {
		pIsDead = player.isDead()
		console.log(!pIsDead?"vivo":"morto");
		console.log(player);
		console.log(board.laser);
		if (!pIsDead) {
			clearGrid();
			board.advanceLaser();
			player.move(Math.floor(Math.random() * 5));
			if (cnt % board.round == 0) board.createLaser ();
			board.draw(0);
			player.draw(0); 
		}
		else {clearInterval(cycle);}
		cnt++
  }
}

function clearGrid(){
    var cells = document.getElementsByClassName("grid-item");
    for (var i = 0; i < cells.length; i++)
        cells[i].style.backgroundColor = "white";    
}

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}
