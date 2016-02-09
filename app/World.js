var Cell = require('./Cell');

var World = function(size, seed) {
	this.size = size || 10;
	this.seed = seed || require('../data/seed');
	this.cells = (function(params){
		var cells = new Array(params.size);
		for(var i=0; i < params.size; i++) {

			cells[i] = new Array(params.size);
			for(var e=0; e < params.size; e++) {
				cells[i][e] = new Cell(params.seed[i]? params.seed[i][e] : 0);
			}
		}

		return cells;
	})({size: this.size, seed: this.seed});
};

World.prototype.count = function(x,y) {
	var result = {
		alive: 0,
		dead: 0
	};

	for(var xi=-1; xi<=1; xi++) {
		for(var yi=-1; yi<=1; yi++) {
			var xIndex = x + xi;
			var yIndex = y + yi;

			if( !((xi == 0 && yi == 0) || xIndex < 0 || yIndex < 0 || xIndex >= this.size || yIndex >= this.size) ) {
				if(this.cells[x+xi][y+yi].alive) { result.alive++; } else { result.dead++; }
			}
		}
	}

	return result;
}

World.prototype.prepare = function(x, y) {
	var living = this.count(x, y).alive;
	if(this.cells[x][y].alive) {
		return living == 2 || living == 3 ? -1 : false;
	} else {
		return living == 3 ? true : -1;
	}
}

World.prototype.prepareAll = function() {
	var toDie = [];
	var toBorn = [];

	for(var x=0; x < this.size; x++) {
		for(var y=0; y < this.size; y++) {
			var goingTo = this.prepare(x,y);
			if(goingTo !== -1) {
				if(goingTo) { toBorn.push([x,y]);} else { toDie.push([x,y]); }
			}
		}
	}

	return {toDie: toDie, toBorn: toBorn};
}

World.prototype.evolve = function() {
	var result = this.prepareAll();
	var cells = this.cells;
	var x = 0, y = 1;

	result.toDie.forEach(function(location) {
		cells[location[x]][location[y]].kill();
	});

	result.toBorn.forEach(function(location) {
		cells[location[x]][location[y]].revive();
	});
	return cells;
}

World.prototype.toString = function() {
	var world = "";
	for(x=0; x<this.size; x++) {
		world += "[";
		for(y=0; y < this.size; y++) {
			world += this.cells[x][y] + (y < this.size -1 ? ',' : '');
		}
		world += "]\n";
	}
	return world;
}

module.exports = World;