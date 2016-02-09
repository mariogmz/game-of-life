var Gol = require('../app/Gol.js');
var World = require('../app/World');
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
        assert.isNotNull(gol, 'Gol instance is null');
        assert.instanceOf(gol, Gol, 'gol is not an instance of Gol');
      });

      describe('properties', function () {
        var gol;

        before(function () {
          gol = new Gol();
        });

        describe('#world', function(){

          it('should have a world', function () {
            assert.property(gol, 'world', 'Gol does not have a world');
            assert.instanceOf(gol.world, World, 'Gol.world is not a correct instance');
          });

          it('should seed with glider seed by default', function() {
            var size = 30;
            var seed = require('../data/glider-seed');
            var gol = new Gol(100);

            for(var x=0; x<size; x++) {
              for(var y=0; y<size; y++) {
                assert.equal(seed[x][y], gol.world.cells[x][y].alive, JSON.stringify({x:x, y:y}));
              }
            }

          });

          describe('#generations', function() {

             it('should exist', function() {
              var gol = new Gol();
              assert.property(gol, 'generations');
             });


          });
          
        });

      });

      describe('run', function() {
        it('should run #world#evolve #generations times', function() {
          var gol = new Gol(5);
          var originalWorld = JSON.parse(JSON.stringify(gol.world));
          gol.run();
          var equal = true;
          for(var x=0; x < 30; x++){
            for(var y=0; y < 30; y++){
              equal = equal && (originalWorld.cells[x][y].alive == gol.world.cells[x][y].alive);
            }
          }
        });
      });

    });

  });

}

module.exports = golTest();