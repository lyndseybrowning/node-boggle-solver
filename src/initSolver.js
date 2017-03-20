import triePrefixTree from 'trie-prefix-tree';
import config from './config';
import findAdjacents from './findAdjacents';
import utils from './utils';

export default function initSolver(boggle, boggleSize, dictionary, minWordLen) {
  // store dictionary
  const trie = triePrefixTree(dictionary);

  // create the matrix
  const boggleMatrix = utils.getBoggleMatrix(boggleSize, boggle);

  // create the results object that will contain
  // a word and corresponding co-ordinates
  const results = [];

  // recursive solve algorithm
  const solve = function(word, position, deepCoords = [], deepUsed = []) {
    const [row, col] = position;
    const wordLen = word.length;
    const coords = deepCoords.slice();
    const used = deepUsed.slice();

    // push the current position into the co-ordinates array
    coords.push(position);

    // check if the current word is valid
    if (wordLen >= config.minWordLen) {
      const isValid = trie.hasWord(word);
      const isFound = results.includes(word);

      if (isValid && !isFound) {
        results.push({ word, coords });

        // reset co-ordinates ready for the next word
        deepCoords = [];
      }
    }

    // find adjacent letters in the matrix
    const adjacents = findAdjacents(position, boggleSize, deepUsed);

    adjacents.forEach((adjacent) => {
    	used.push(position);

      const [x,y] = adjacent;
      const letter = boggleMatrix[x][y];

      // recurse each adjacent letter
      solve(word + letter, adjacent, coords, used);
    });
  };

  // solve each letter in turn
  boggleMatrix.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
     solve(boggleMatrix[rowIndex][colIndex], [rowIndex, colIndex]);
   });
  });

  return results;
};
