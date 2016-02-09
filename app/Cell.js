var Cell = function(alive) {
	this.alive = alive && true || false;
	
	this.kill = function() {
		this.alive = false;
	};

	this.revive = function() {
		this.alive = true;
	};
};

Cell.prototype.toString = function() {
	return this.alive ? 'O' : ' ';
}

module.exports = Cell;