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
        assert.isFunction(World,  'World is not a function');
      });

      it('should be capable of creating valid instances', function () {
        var world = new World();
        assert.isNotNull(world, 'world instance is null');
        assert.instanceOf(world, World, 'world is not an instance of World');
      });

      describe('properties', function () {
        var world;

        before(function () {
          world = new World();
        });

        describe('#cells', function () {


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

      describe('#count', function() {
        var world;
        beforeEach(function() {
          world = new World();
        });

        it('should exist', function() {
          assert.property(world, 'count');
        });

        it('should be a function', function() {
          assert.isFunction(world.count);
        })

        context('when cell is located at the world boundaries', function() {
          it('should detect neither dead or alive on non-existent neighbour', function() {
            var wiu = require('../data/test-boundaries');
            world = new World(3, wiu);
            console.log(world + '');
            var result = world.count(0,0);
            assert.equal(result.alive, 2);
            assert.equal(result.dead, 1);
          });
        });

        context('when cell is not close to boundaries', function() {
          var seed;
          var x,y;
          var length;

          before(function() {
            x = y = 1;
            length = 3;
          });

          beforeEach(function() {
            seed = [
              [0,0,0],
              [0,0,0],
              [0,0,0],
            ];
          });

          it('should detect cell above', function() {
            seed[x-1][y] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);

            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell below', function() {
            seed[x+1][y] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
            
          });

          it('should detect cell at right', function() {
            seed[x][y+1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell at left', function() {
            seed[x][y-1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell above left', function() {
            seed[x-1][y-1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell above right', function() {
            seed[x-1][y+1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell below left', function() {
            seed[x+1][y-1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });

          it('should detect cell below right', function() {
            seed[x+1][y+1] = 1;
            var world = new World(length, seed);
            var result = world.count(x,y);
            
            assert.equal(result.alive, 1);
            assert.equal(result.dead, 7);
          });
        })
      });

    });

  });
}

module.exports = worldTest();