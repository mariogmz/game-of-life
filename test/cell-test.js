var assert = require('chai').assert;
var Cell = require('../app/Cell');

describe('Cell', function() {

	describe('object definition', function() {
		it('should exist', function() {
			assert.isDefined(Cell);
		});

		it('should be a function', function(){
			assert.isFunction(Cell);
		});
	});
});