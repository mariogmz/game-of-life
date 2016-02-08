var assert = require('chai').assert;
var Cell = require('../app/Cell');

var cellTest = function() {

	describe('Cell', function() {

		describe('object definition', function() {
			it('should exist', function() {
				assert.isDefined(Cell);
			});

			it('should be a function', function(){
				assert.isFunction(Cell);
			});

			it('should be capable of creating valid instances', function() {
				var cell = new Cell();
				assert.isNotNull(cell);
				assert.instanceOf(cell, Cell);
			});

			describe('properties', function() {
				var cell;

				before(function() {
					cell = new Cell();
				});

				describe('#alive', function() {
					it('should exist', function() {
						assert.property(cell, 'alive');
					});

					it('should be false or 0 by default', function() {
						assert.equal(cell.alive, 0);
						assert.equal(cell.alive, false);
					})
				});

				describe('#kill', function() {
					it('should set alive to false', function() {
						cell.alive = true;
						cell.kill();
						assert.isFalse(cell.alive);
					});
				});

				describe('#revive', function() {
					it('should set alive to true', function() {
						cell.alive = false;
						cell.revive();
						assert.isTrue(cell.alive);
					});
				});
			});
		});
	});
}

module.exports = cellTest();