var difficulty = -40;
//first upper bar
var pipeImage1Ready=false;
var pipeImage1 = new Image();
pipeImage1.onload = function() {
	pipeImage1Ready=true;
}
pipeImage1.src="images/upper2.png";

var pipeImage2Ready=false;
var pipeImage2 = new Image();
pipeImage2.onload = function() {
	pipeImage2Ready=true;
}
pipeImage2.src="images/lower2.png";

var Pipe = function(spd, x, y) {
	this.xspeed = spd;
	this.x = x;
	this.y = y;
	this.acc = -10;
}

Pipe.prototype.move = function(modifier) {
	this.xspeed = this.xspeed + this.acc * modifier;
	this.x = this.x + this.xspeed * modifier;
}

Pipe.prototype.reset = function(x, y) {
	this.y=y;
	this.x=x;

}