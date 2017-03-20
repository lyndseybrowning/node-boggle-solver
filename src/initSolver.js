import triePrefixTree from 'trie-prefix-tree';
import config from './config';
import findAdjacents from './findAdjacents';
import utils from './utils';

const MIN_WORD_LEN = config.minWordLen;

export default function initSolver(boggle, boggleSize, dictionary, minWordLen) {
  // store dictionary
  const trie = triePrefixTree(dictionary);

  // create the matrix
  const boggleMatrix = utils.getBoggleMatrix(boggleSize, boggle);

  // create the results object that will contain
  // a word and corresponding co-ordinates
  const results = [];
  const wordList = [];

  // recursive solve algorithm
  const solve = function(word, position, deepCoords = [], deepUsed = []) {
    const [row, col] = position;
    const wordLen = word.length;

    // create new copies of both coords and used positions
    // for each letter
    const coords = deepCoords.slice();
    const used = deepUsed.slice();

    // push the current position into the co-ordinates array
    coords.push(position);

    // check if the current word is valid
    if (wordLen >= MIN_WORD_LEN) {
      const isValid = trie.hasWord(word);
      const isFound = wordList.includes(word);

      if (isValid && !isFound) {
        results.push({ word, coords });
        wordList.push(word);

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
      // but only if it is a valid prefix in the trie
      if (trie.isPrefix(word + letter)) {
        solve(word + letter, adjacent, coords, used);
      }
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
