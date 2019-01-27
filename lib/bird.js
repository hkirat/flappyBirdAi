var bgReady = false;
var birdImages = [];
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.jpg";
//bird image
var bird1Ready = false;
var bird1Image = new Image();
bird1Image.onload = function()
{
	bird1Ready=true;
}
bird1Image.src="images/gif/a-0.png";
birdImages.push(bird1Image);

var bird2Ready = false;
var bird2Image = new Image();
bird2Image.onload = function()
{
	bird2Ready=true;
}
bird2Image.src="images/gif/a-1.png";
birdImages.push(bird2Image);

var bird3Ready = false;
var bird3Image = new Image();
bird3Image.onload = function()
{
	bird3Ready=true;
}
bird3Image.src="images/gif/a-2.png";
birdImages.push(bird3Image);
var birdReady = [];
birdReady.push(bird1Ready);
birdReady.push(bird2Ready);
birdReady.push(bird3Ready);

var Bird = function(brain, params) {
	this.yspeed = 0;
	this.yacc = 550;
	this.y = 300;
	this.x = 2;
	this.score = 0;
	if(brain) {
		this.brain = brain.copy();
	} else {
		if(params) {
			this.brain = new NeuralNetwork(params[0], params[1], params[2]);
		} else {
			this.brain = new NeuralNetwork(4, 8, 1);
		}
	}
	this.fitness = 0;
};

Bird.prototype.update = function(modifier) {
	this.yspeed += (this.yacc * modifier);
	this.y += (this.yspeed * modifier);
}

Bird.prototype.mutate = function(modifier) {
	this.brain.mutate(mutate);
}

Bird.prototype.think = function() {
	var index = findClosestPipe();
	var inputs = [this.y/605, upperPipes[index].x/605, (upperPipes[index].y + 670)/650, lowerPipes[index].y/650];
	var output = this.brain.predict(inputs);
	if(output[0] > .5) {
		this.up();
	}
}

function findClosestPipe() {
	var ans = 0;
	var val = upperPipes[0].x;
	if(upperPipes[1].x < upperPipes[0].x) {
		ans = 1;
		val = upperPipes[1].x;
	}
	if(upperPipes[2].x < val) {
		ans = 2;
	}
	return ans;
}

function mutate(x) {
  if (Math.random() < 0.1) {
    let offset = gaussianRand() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}
Bird.prototype.up = function() {
	this.yspeed = -270;
}