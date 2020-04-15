var columns = 7;
var speed = 200
var show = true
function writeGrids (games) {
	var body = document.body
	/*var grid = document.getElementsByClassName("grid-container")[0];
	for (var i = 0; i < columns*columns; i++){
		var div = document.createElement("DIV");
		div.id = i;
		div.classList.add("grid-item");
		grid.appendChild(div);
	}*/
	for (var j = 0; j < games; j++){
		var grid = document.createElement("DIV");
		grid.id = "grid" + j;
		grid.classList.add("grid-container");
		for (var i = 0; i < columns*columns; i++){
				var div = document.createElement("DIV");
				div.id = grid.id + "slot" + i;
				div.classList.add("grid-item");
				grid.appendChild(div);
		}	
		body.appendChild(grid);
	}
}
