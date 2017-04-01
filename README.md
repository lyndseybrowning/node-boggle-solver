# Node Boggle Solver

[![Travis Build](https://img.shields.io/travis/lyndseybrowning/node-boggle-solver.svg?style=flat-square)](https://travis-ci.org/lyndseybrowning/node-boggle-solver)
[![codecov coverage](https://img.shields.io/codecov/c/github/lyndseybrowning/node-boggle-solver.svg?style=flat-square)](https://codecov.io/github/lyndseybrowning/node-boggle-solver)
[![downloads](https://img.shields.io/npm/dm/node-boggle-solver.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-boggle-solver&from=2015-08-01)
[![version](https://img.shields.io/npm/v/node-boggle-solver.svg?style=flat-square)](http://npm.im/node-boggle-solver)
[![MIT License](https://img.shields.io/npm/l/node-boggle-solver.svg?style=flat-square)](http://opensource.org/licenses/MIT)

[Boggle](https://en.wikipedia.org/wiki/Boggle) is a game in which players try to find as many words as possible in a 4x4 grid of letters.

This solver is built with JavaScript using a [Trie](https://en.wikipedia.org/wiki/Trie) for dictionary storage.

The default dictionary is [SOWPODS](https://en.wikipedia.org/wiki/Collins_Scrabble_Words) and contains approximately 260,000 English words.

## Installation

Pull down dependencies:

```
npm install
```

This project uses [Jest](https://facebook.github.io/jest/) for unit testing and [ESLint](http://eslint.org/) for linting.

To run units tests:

```
npm test
```

To run linting:

```
npm run lint
```

Run tests in watch mode:

```
npm run test-watch
```

Get code coverage report:

```
npm run test-coverage
```

## How to Use

To use the solver, install and save it to your package dependencies:

```
npm install node-boggle-solver --save
```

Instantiate the solver with the default dictionary or with a custom dictionary:

```javascript
// pull in the module
var boggle = require('node-boggle-solver');

// or import using ES2015 modules syntax
import boggle from 'node-boggle-solver';

// instantiate and use the default dictionary
var defaultSolver = boggle();

// or use your own dictionary
var customSolver = boggle(['hello', 'world']);
```

### Solver

The solver accepts grids of **3x3** and upwards. Letters can be **lowercase** , **uppercase** or **space delimited**. A **callback** function should be used to return any error and the solved data.

Example:

```javascript
var boggle = require('node-boggle-solver');

// instantiate the solver
var solver = boggle();

// solve a 3x3 grid
solver.solve('ABCDEFGHI', function(err, result) { });
solver.solve('abcdefghi', function(err, result) { });
solver.solve('abc def ghi', function(err, result) { });

// solve a 4x4 grid
solver.solve('sers patl gine ress', function(err, result) { });

// solve a 5x5 grid
solver.solve('rscls deiae gnrps iaeso lmidn', function(err, result) { });
```

The first argument of the callback function is reserved for an error object. If an error occurs, it will be returned by the error argument.  

The second argument is the data returned by the solver. It contains multiple properties and methods that act on the words found by the solver:

| **Name**   | **Type** | **Return Type** | **Description**                                                                       |
|------------|----------|-----------------|---------------------------------------------------------------------------------------|
| full       | property | Array           | An array of objects containing word found and corresponding co-ordinates in the board |
| list       | property | Array           | List of words found                                                                   |
| hasWord    | method   | Boolean         | Checks if the passed in word is contained within the resulting word list              |
| contains   | method   | Array           | Filters word list to words that contain **any** of the letters passed in              |
| startsWith | method   | Array           | Filters word list to words that start with the given prefix                           |
| endsWith   | method   | Array           | Filters word list to words that end with the given suffix                             |
| lengthOf   | method   | Array           | Filters word list to the specified length                                             |

**Examples:**

```javascript
solver.solve('abc def ghi', function(err, result) {
  if (err) {
    throw(err);
  }

  var listWithCoords = result.full;

  listWithCoords[0]; // { word: 'badge', coords: [ [0, 1], [0, 0], [1, 0], [2, 0], [1, 1] ] }

  result.list.length; // 25
  result.list; // ['abed', 'bad', 'bade', 'badge', ...]

  result.hasWord('badge'); // true
  result.hasWord('badges'); // false

  result.contains('dahe'); // ['head']
  result.contains('ab'); // ['abed', 'bad', 'bade', 'badge', 'bead', 'dab']

  result.startsWith('ab'); // ['abed']
  result.endsWith('ed'); // ['abed', 'bed', 'fed', 'ged', 'hied']

  result.lengthOf(5); // ['badge']
});
```

# License

Copyright (c) 2017 Lyndsey Browning

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
