function normaliseFitness() {
	var sum = [];
	for(var i = 0; i<varietyOfBirds.length; i++) {
		sum.push(0);
	}
	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<savedBirds[i].length; j++) {
			sum[i] += savedBirds[i][j].fitness;
		}
	}
	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<savedBirds[i].length; j++) {
			savedBirds[i][j].fitness /= sum[i];
		}
	}
}

function pickOne(i) {
	var index = 0;
	var r = Math.random();

	while(r>0) {
		r = r-savedBirds[i][index].fitness;
		index++;
	}
	index--;
	let bird = savedBirds[i][index];
	let child = new Bird(bird.brain);
	child.mutate();
	return child;
}

function refreshBirds() {
	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<savedBirds[i].length; j++) {
			birds[i].push(pickOne(i));
		}
	}
}
