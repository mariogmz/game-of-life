var assert = require('chai').assert;
var World = require('../app/World');

var worldTest = function () {

  describe('World', function () {
    'use strict';

    describe('object definition', function () {

      it('should exist', function () {
        assert.isDefined(World, 'World is not defined');
      });

      it('should be a function', function () {
        assert.isFunction(World, 'World is not a function');
      });

      it('should be capable if creating valid instances', function () {
        var world = new World();
        assert.isNotNull(world, 'world instance is null');
        assert.instanceOf(world, World, 'world is not an instance of World');
      });

      describe('properties', function () {
        var world;

        before(function () {
          world = new World();
        });

        describe('world of cells', function () {


          it('should be an orthogonal two-dimentional array', function () {
            assert.property(world, 'cells');
            assert.isArray(world.cells);
            var xLength = world.cells.length;
            world.cells.forEach(function (cellsX) {
              assert.equal(cellsX.length, xLength);
            });
          });

          it('should be 10x10 by default', function () {
            var n = 10;
            assert.equal(world.cells.length, n);
            world.cells.forEach(function (cellsX) {
              assert.equal(cellsX.length, n);
            });
          });

          it('should be a two-dimentional array of Cells', function () {
            var Cell = require('../app/Cell');
            world.cells.forEach(function (cellsX) {
              cellsX.forEach(function (cell) {
                assert.instanceOf(cell, Cell);
              });
            });
          });

        });
      });
    });

  });
}

module.exports = worldTest();