function getNodeColor (net, i) {
	if (i < net.input_size)
		return "blue"
	if (i > net.nodes.length - net.output_size)
		return "red"
	return "yellow"
/*	if (node.type == "hidden")
		return "yellow"
	if (node.type == "output")
		return "red"
	if (node.type == "input")
		return "blue"*/
}

function generateGraph (a){
	let nodes_vis = []
	let edges_vis = []
	let net = a.toJSON()
	//console.log("??")
	console.log(net)
	for (var i = 0; i < net.input_nodes.length; i++){
			nodes_vis.push({
				id: net.input_nodes[i],
				label: "",
				color: {background: "blue"},
			})
	}
	
	for (var i = 0; i < net.output_nodes.length; i++){
			nodes_vis.push({
				id: net.output_nodes[i],
				label: "",
				color: {background: "red"},
			})
	}

	for (var i = net.output_nodes[net.output_nodes.length-1]+1; i < net.nodes.length; i++){
				nodes_vis.push({
				id: i,
				label: "",
				color: {background: "yellow"},
			})
	}
	for (var i = 0; i < net.connections.length; i++){
		//console.log (net.connections[i].from)
		edges_vis.push({
			from: net.connections[i].from,
			to:   net.connections[i].to,
			color: (net.connections[i].weight == 1) ? "white" : ((net.connections[i].weight > 0) ? "green" : "red")

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
             sortMethod: "directed"
           }
         },
         physics: false
       }
	   var network = new vis.Network(container, data, options);
	return 0 
}