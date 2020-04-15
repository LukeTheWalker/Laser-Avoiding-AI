class Board {
	
	constructor(col){
		this.llength = col
		this.round = 2
		this.laser = []
	}
	
	draw (i){
		this.laser.forEach( (x, y) =>{
			if (x != this.llength) {
				/*
				if (document.getElementById("grid" + i + "slot" + String(x + y*columns)) == null)
					console.log(("grid" + i + "slot" + String(x + y*columns)))
				*/
//				document.getElementById("grid" + i + "slot" + String(x + y*columns)).style.backgroundColor = "red";    
				document.getElementById("grid" + i + "slot" + String(x + y*columns)).classList.add("laser");    
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
		var pos = Math.floor(Math.random() * this.llength);    
		while (this.laser[pos] != this.llength) pos = Math.floor(Math.random() * this.llength);
		this.laser[pos] = this.llength-1
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

function clearGrid(){
    var lasers = document.getElementsByClassName("laser");
	var birds = document.getElementsByClassName("bird");
//    for (var i = 0; i < cells.length; i++)
        //cells[i].style.backgroundColor = "white";    
    while (lasers.length) lasers[0].classList.remove("laser")
    while (birds.length) birds[0].classList.remove("bird")
}