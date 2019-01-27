var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 602;
canvas.height = 604;
document.body.appendChild(canvas);
var spd=-140;
var acc=-5;
var lowerPipes = [new Pipe(spd, 480+240, -490), new Pipe(spd, 240, -550), new Pipe(spd, 480, 400)];
var upperPipes = [new Pipe(spd, 480+240, 400), new Pipe(spd, 240, 435), new Pipe(spd, 480, 460)];
var birds = [];
var savedBirds = [];
var BIRD_SIZE = 1003;
var varietyOfBirds = [[4, 4, 1], [4, 8, 1], [4, 16, 1]];
var gen = 0;
var keysDown = {};
//adding key listeners
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	f=0;
}, false);

//function to reset game
var reset = function (nextGen) {
	gen++;
	if(nextGen) {
		normaliseFitness();
		refreshBirds();
		savedBirds = [];
		for(var i = 0; i<varietyOfBirds.length; i++) {
			savedBirds.push([]);
		}
		difficulty=-60;
		upperPipes = [new Pipe(spd, 480+240, -490), new Pipe(spd, 240,-350), new Pipe(spd, 480, -400)];
		lowerPipes = [new Pipe(spd, 480+240, 400), new Pipe(spd, 240, 550), new Pipe(spd, 480, 460)];
		return;
	}
	difficulty=-40;
	birds = [];
	savedBirds = [];
	for(var i = 0; i<varietyOfBirds.length; i++) {
		savedBirds.push([]);
	}
	for(var i = 0; i<varietyOfBirds.length; i++) {
		birds.push([]);
		for(var j = 0; j<BIRD_SIZE; j++) {
			birds[i].push(new Bird(null, varietyOfBirds[i]));
		}
	}

	upperPipes = [new Pipe(spd, 480+240, -490), new Pipe(spd, 240,-350), new Pipe(spd, 480, -400)];
	lowerPipes = [new Pipe(spd, 480+240, 400), new Pipe(spd, 240, 550), new Pipe(spd, 480, 460)];
};

var f=0;
// function that is called a lot
var update = function (modifier) 
{
	for(var i = 0; i<3; i++) {
		upperPipes[i].move(modifier);
		lowerPipes[i].move(modifier);
		if(upperPipes[i].x < -90) {
			upperPipes[i].reset(600, -400-Math.random()*50);
		}
		if(lowerPipes[i].x < -90) {
			lowerPipes[i].reset(600, 450-Math.random()*50);
			if(Math.random()<.2) {
				lowerPipes[i].y-=100;
				upperPipes[i].y-=100;
			}
		}
	}

	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<birds[i].length; j++) {
			birds[i][j].score+=modifier;
			difficulty=-40+birds[i][j].score/2;	
		}
	}

	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<birds[i].length; j++) {
			birds[i][j].think();
			birds[i][j].update(modifier);
		}
	}

	var f = false;
	for(var k = 0; k<varietyOfBirds.length; k++) {
		for(var j = 0; j<birds[k].length; j++) {
			var collision = false;
			for(var i = 0; i<3; i++) {
				if(upperPipes[i].x < 46 && birds[k][j].y < upperPipes[i].y + 670) {
					collision = true;
				}
				if(lowerPipes[i].x < 46 && birds[k][j].y > lowerPipes[i].y - 55) {
					collision = true;
				}
			}

			if(birds[k][j].y<=130 || birds[k][j].y>550) {
				collision = true;
			}
			if(collision) {
				savedBirds[k].push(birds[k].splice(j, 1)[0]);
				j--;
			} else {
				birds[k][j].fitness++;
			}
		}
		if(birds[k].length != 0) {
			f = true;
		}
	}
	if(!f) {
		reset(true);
	}
};
var maxScore = 0;

//function to render on the screen
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	var score = 0;
	for(var i = 0; i<varietyOfBirds.length; i++) {
		for(var j = 0; j<birds[i].length; j++) {
			ctx.drawImage(birdImages[(i+2)%3], birds[i][j].x, birds[i][j].y);
			if(birds[i][j].score > score) {
				score = birds[i][j].score;
			}
		}
	}
	
	for(var i = 0; i<3; i++) {
		if(pipeImage1Ready && pipeImage2Ready) {
			ctx.drawImage(pipeImage1,upperPipes[i].x,upperPipes[i].y);
			ctx.drawImage(pipeImage2,lowerPipes[i].x,lowerPipes[i].y);
		}
	}
	if(score > maxScore) {
		maxScore = score;
	}
	ctx.font = "24px Helvetica";
	ctx.fillText("Points: " +parseInt(score), 32, 32);
	ctx.fillText("Max Points: " +parseInt(maxScore), 32, 62);
	ctx.fillText("Generation: " +parseInt(gen), 32, 100);

/*	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
*/};

// the main loop of the game
ctr = 0;
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
		render();
	ctr++;
	then = now;
	requestAnimationFrame(main);
};
var then = Date.now();
reset(false);
main();
