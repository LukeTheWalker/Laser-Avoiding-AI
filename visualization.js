function getNodeColor (net) {
/*	if (node.type == "hidden")
		return "yellow"
	if (node.type == "output")
		return "red"
	if (node.type == "input")
		return "blue"*/
}
function weightColor (weight) {
	if (weight == 1)
		return "black"
	if (weight > 0)
		return "green"
	return "red"
}
async function generateGraph (a){
	let nodes_vis = []
	let edges_vis = []
	let net = a.toJSON()
	//console.log("??")
	console.log(net)
	for (var i = 0; i < net.input_nodes.length; i++){
			nodes_vis.push({
				id: net.input_nodes[i],
				label: "",
				level: 0,
				color: {background: "blue"},
			})
	}
	
	for (var i = 0; i < net.output_nodes.length; i++){
			nodes_vis.push({
				id: net.output_nodes[i],
				label: "",
				level: 2,
				color: {background: "red"},
			})
	}

	for (var i = net.output_nodes[net.output_nodes.length-1]+1; i < net.nodes.length; i++){
				nodes_vis.push({
				id: i,
				label: "",
				level: 1,
				color: {background: "yellow"},
			})
	}
	for (var i = 0; i < net.connections.length; i++){
		//console.log (net.connections[i].from)
		edges_vis.push({
			from: net.connections[i].from,
			to:   net.connections[i].to,
			color: weightColor (net.connections[i].weight)

		})
	}
	var container = document.getElementById("mynetwork");
	var data = {
		nodes: nodes_vis,
		edges: edges_vis
	};
       const options = {
         autoResize: true,
         edges: {
           arrows: {
              to: {enabled: true, scaleFactor:1, type:'arrow'}
            },
           smooth: {
             type: "cubicBezier",
             forceDirection: "horizontal"
           }
         },
         layout: {
           hierarchical: {
             direction: "LR",
             sortMethod: "directed",
			 levelSeparation: 200
           }
         },
         physics: false
       }
	   var network = new vis.Network(container, data, options);
	return 0 
}
async function updatePlot (data){
	Plotly.extendTraces("plotter", {
			x: [[data[0]]],
			y: [[data[1]]]
		}, [0]);
}
let plotter = document.getElementById("plotter")
Plotly.plot(plotter, [{
		x: [0],
		y: [0],
		type: 'scatter'
	}])
