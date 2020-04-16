const { Neat, Network, methods, architect } = window.carrot;

const settings = {
	population_size: 50,
	mutation_rate: 0.9,
	mutation_amount: 2,
	mutation_methods: methods.mutation.FFW,
	elitism: 5
}

let neat = new Neat (1+columns, 2, {
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
let dead = 0
let cnt = 0

let bests = []
let genLabel = document.getElementById("gen-label")
let bestLabel = document.getElementById("best-label")
let averageLabel = document.getElementById("average-label")


async function partita () {
	//uccide i player
	clearGrid()
	board.advanceLaser()
	activePlayers.forEach (player => {
		if (player.alive){
			player.move(player.brain.activate( [player.y,...board.laser] ))
			if (!player.isDead())
				player.brain.score++
			else 
				dead++
		}
	})
	if (cnt % board.round == 0) board.createLaser ()
	cnt++
	
	if (show){
		board.draw(0)
		for (let i = 0; i < activePlayers.length; i++) if (activePlayers[i].alive) activePlayers[i].draw(0)
	}
	
	if (dead == neat.population.length){
		neat.sort()
		const total = neat.population.reduce((sum, brain) => sum + brain.score, 0)
    	const average = total / neat.population.length
		const best = neat.population[0]
		genLabel.innerHTML = ("-------------- Gen " + neat.generation + " -------------")
		//averageLabel.innerHTML = (neat.getAverage())
		bestLabel.innerHTML = (best.score)
		generateGraph (neat.population[0])
		updatePlot([neat.generation, best.score])
		activePlayers = populate(await neat.evolve())
		dead = 0
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