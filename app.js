var Gol = require('./app/Gol');
var gol = new Gol();
console.clear = function() {
	return process.stdout.write('\033c');
};
gol.run();