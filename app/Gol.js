var World = require('./World');
var sleep = require('sleep');

var Gol = function(generations, size, seed) {
	this.generations = generations || 100;
	this.world = new World(size || 30, seed || require('../data/glider-seed'));
};

Gol.prototype.run = function() {
	var world = this.world;
	var print = this.print;
	for(var times=0; times < this.generations; times++) {	
		this.print();
		this.world.evolve();
	}
};

Gol.prototype.print = function() {
	console.clear();
	console.log(this.world + '');
	sleep.sleep(1);
	
};

module.exports = Gol;