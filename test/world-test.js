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
            world = new World(3, require('../data/test-boundaries'));
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

      describe('#prepare', function() {
        var world;
        var seed;
        var size;
        var x,y;

        before(function() {
          size = 3;
          x = y = 1;
        });

        beforeEach(function() {
          world = new World();
        });

        it('should exist', function() {
          assert.property(world, 'prepare');
        });

        it('should be a function', function() {
          assert.isFunction(world.prepare);
        });

        context('if the cell is alive', function() {

          it('should die if there are few than two live neighbours', function() {
            seed = [
              [1,0,0],
              [0,1,0],
              [0,0,0]
            ];
            world = new World(size, seed);
            assert.isFalse(world.prepare(x,y));
          });

          it('should die if there are more than three live neighbours', function() {
            seed = [
              [0,1,0],
              [0,1,1],
              [1,1,1]
            ];
            world = new World(size, seed);
            assert.isFalse(world.prepare(x,y));
          });

          it('should persist if there are three live neighbours', function() {
            seed = [
              [0,1,1],
              [0,1,1],
              [0,0,0]
            ];
            world = new World(size, seed);
            assert.equal(world.prepare(x,y), -1);
          });

          it('should persist if there are two live neighbours', function() {
            seed = [
              [0,1,0],
              [0,1,1],
              [0,0,0]
            ];
            world = new World(size, seed);
            assert.equal(world.prepare(x,y), -1);
          });
        });

        context('if the cell is dead', function() {
          it('should come to life if there are three live neighbours', function() {
            seed = [
              [0,1,1],
              [0,0,1],
              [0,0,0]
            ];
            world = new World(size, seed);
            assert.isTrue(world.prepare(x,y));
          });

          it('should remain dead if there are few than three live neighbours', function() {
            seed = [
              [0,1,0],
              [0,0,0],
              [1,0,0]
            ];
            world = new World(size, seed);
            assert.equal(world.prepare(x,y), -1);
          });

          it('should remain dead if there are more than three live neighbours', function() {
            seed = [
              [1,1,1],
              [1,0,0],
              [0,1,0]
            ];
            world = new World(size, seed);
            assert.equal(world.prepare(x,y), -1);
          });
        });
      });

      describe('#prepareAll', function() {
        var seed;
        var size;
        var world;

        before(function() {
          seed = [
            [0,1,0],
            [0,1,0],
            [1,0,1]
          ];
          size = 3;
          world = new World(size, seed);

        });

        it('should exists', function() {
          assert.property(world, 'prepareAll');
        });

        it('should be a function', function() {
          assert.isFunction(world.prepareAll);
        });

        it('should get which cells are going to die on next evolution', function() {
          var nextToDie = world.prepareAll().toDie;
          assert.lengthOf(nextToDie, 3);
          var expected = [[0,1],[2,0],[2,2]];
          assert.sameDeepMembers(nextToDie, expected);
        });

        it('should get which cells are going to born on next evolution', function() {
          var nextToBorn = world.prepareAll().toBorn;
          assert.lengthOf(nextToBorn, 3);
          var expected = [[1,0],[1,2],[2,1]];
          assert.sameDeepMembers(nextToBorn, expected);
        });

      });

      describe('#evolve', function() {
        var world;
        before(function() {
          world = new World();
        });

        it('should exist', function() {
          assert.property(world, 'evolve');
        });

        it('should be a function', function() {
          assert.isFunction(world.evolve);
        });

        it('should change each one of the cells to its next stage of evolution', function() {
          var seed = [
            [0,1,0],
            [0,1,0],
            [1,0,1]
          ];
          var expected = [
            [0,0,0],
            [1,1,1],
            [0,1,0]
          ];
          var size = 3;
          world = new World(size, seed);
          var newWorld = world.evolve();
          for(var x=0; x < size; x++) {
            for(var y=0; y < size; y++) {
              assert.equal(newWorld[x][y].alive, expected[x][y]);
            }
          }
        });
      });

    });

  });
}

module.exports = worldTest();