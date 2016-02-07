var Gol = require('../app/Gol.js');
var assert = require('chai').assert;

var golTest = function () {
  'use strict';

  describe("Gol", function () {

    describe('object definition', function () {

      it('should exists', function () {
        assert.isDefined(Gol, 'Gol is undefined');
      });

      it('should be a function', function () {
        assert.isFunction(Gol, 'Gol is not a function');
      });

      it('should be capable of creating valid instances', function () {
        var gol = new Gol();
        assert.notNull(newGol, 'Gol instance is null');
        assert.instanceOf(newGol, Gol, 'gol is not an instance of Gol');
      });

      describe('properties', function () {
        var gol;

        before(function () {
          gol = new Gol();
        });

        it('should have a world', function () {
          assert.property(gol, 'world', 'Gol does not have a world');
          var World = require('../app/World');
          assert.instanceOf(gol.world, World, 'Gol.world is not a correct instance');
        });

      });

    });

  });

}

module.exports = golTest();