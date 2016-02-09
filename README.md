Conway's Game Of Life
=====================

The Game of Life (or simply Life) is not a game in the conventional sense. There are no players, and no winning or losing. Once the "pieces" are placed in the starting position, the rules determine everything that happens later. Nevertheless, Life is full of surprises! In most cases, it is impossible to look at a starting position (or pattern) and see what will happen in the future. The only way to find out is to follow the rules of the game.

### Rules ###

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead. Every cell interacts with its eight neighbours, which are the cells that are directly horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by needs caused by underpopulation.
2. Any live cell with more than three live neighbours dies, as if by overcrowding.
3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.
4. Any dead cell with exactly three live neighbours will come to life.

The initial pattern constitutes the 'seed' of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed — births and deaths happen simultaneously, and the discrete moment at which this happens is sometimes called a tick. (In other words, each generation is a pure function of the one before.) The rules continue to be applied repeatedly to create further generations.

### Usage ###

If you want to start playing right now just run on terminal:

`node app.js`

If you want to end the game just press Ctrl + C, as with any other process on terminal.

* By default Gol runs on a 30 size orthogonal board, and it runs 100 generations, one generation per second.
* If you want to change the seed you can change the file on `data/glider-seed.js` and see what happens.

To run the tests you must first run `npm install` and then `npm test`

### Customize GOL ###

This project is done using Node JS, you can simply run Node interpreter on your command line and initialize a new Gol object, it receives 3 params:

1. **generations**: 100 by default;
2. **size**: size of the orthogonal two-dimensional array.
3. **seed**: sample seed, you can set your own based on the examples included on `data` folder.

### Final thoughts ###
Well, this was a very fun project, it's useful to play around a little bit with TDD so you can play with any assertion library, testing framework and even any programming language you desire.

I made a lot of unit testing along with CommonJS practices, and prototypes so I practiced a lot of JS terms that usually are a pain on the ass for begginers.

Made with <3 by Mario Gomez (mariogomezmtz@gmail.com)

