const { Neat, Network, methods, architect } = window.carrot;

const settings = {
	population_size: 50,
	mutation_rate: 0.9,
	mutation_amount: 2,
	mutation_methods: methods.mutation.FFW,
	elitism: 5
}

let neat = new Neat (1+columns, 3, {
	population_size:	settings.population_size,
	elitism: 			settings.elitism,
	mutation: 			settings.mutation_methods,
  	mutation_rate: 		settings.mutation_rate,
  	mutation_amount:	settings.mutation_amount,
	equal: false

});

const populate = population => population.map(brain => new Player(brain))

neat.generation = 1

let board = new Board(columns)

let activePlayers = populate(neat.population)
let dead = []
let cnt = 0

let bests = []
let genLabel = document.getElementById("gen-label")
let bestLabel = document.getElementById("best-label")
let averageLabel = document.getElementById("average-label")


async function partita () {
	//uccide i player
	clearGrid()
	board.advanceLaser()
	activePlayers = activePlayers.filter(player => {
		player.move(player.brain.activate( [player.y,...board.laser] ))
		if (player.isDead()){
			dead.push(player.brain)
			return false
		}
		else {
			player.brain.score++
			return true
		}
	})

	if (cnt % board.round == 0) board.createLaser ()
	cnt++	
	if (show){
		board.draw(0)
		for (let i = 0; i < activePlayers.length; i++) if (activePlayers[i]) activePlayers[i].draw(0)
	}
	if (activePlayers.length == 0){
		neat.population = dead
		if(settings.population_size !== neat.population.length) 
			console.error("In fact, he was right: uncorrespponding population_size(s) \n" + settings.population_size + " ------- vs -------- " + neat.population.length)
		
		const total = neat.population.reduce((sum, brain) => sum + brain.score, 0)
    	const average = total / neat.population.length
		neat.sort()
		genLabel.innerHTML = ("-------------- Gen " + neat.generation + " -------------")
		//averageLabel.innerHTML = (neat.getAverage())
		bestLabel.innerHTML = (neat.population[0].score)
		Plotly.extendTraces("plotter", {
			x: [[neat.generation]],
			y: [[neat.population[0].score]]
		}, [0])
		//updatePlot ()
		neat.elitism = Number(settings.elitism) // Avoid implicit type coercion, adjust elitism before evolve
  		//for (let i = 0; i < neat.population.length; i++)neat.population[i].score = Number(neat.population[i].score)
		//for (let i = 0; i < neat.population.length; i++)console.log(neat.population[i].score)
		//console.log(await neat.evolve())
		generateGraph(neat.population[0])
		activePlayers = populate(await neat.evolve())
		dead = []
		cnt = 0
		document.getElementById("grid" + 0).remove()
		fitness()
		return
	}
	else 
		setTimeout(partita, speed) 	
}


function fitness () {
	board.initLaser()
	writeGrids(1)
	setTimeout(partita, speed) 
}