import config from './config';
import findAdjacents from './findAdjacents';
import utils from './utils';
import triePrefixTree from 'trie-prefix-tree';

const MIN_WORD_LEN = config.minWordLen;

export default function initSolver(boggle, boggleSize, trie, minWordLen) {
  // allow the user to customise the minimum word length returned
  // the default is 3
  minWordLen = minWordLen || MIN_WORD_LEN;

  // create the matrix
  const boggleMatrix = utils.getBoggleMatrix(boggleSize, boggle);

  // create the full object that will contain
  // a word and corresponding co-ordinates
  const full = [];
  const list = [];

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
    if (wordLen >= minWordLen) {
      const isValid = trie.hasWord(word);
      const isFound = list.includes(word);

      if (isValid && !isFound) {
        full.push({ word, coords });
        list.push(word);

        // reset co-ordinates ready for the next word
        deepCoords = [];
      }
    }

    // find adjacent letters in the matrix
    const adjacents = findAdjacents(position, boggleSize, deepUsed);

    // filter adjacents that are not valid prefixes
    const validAdjacents = adjacents.filter((adjacent) => {
      const [x, y] = adjacent;
      const isPrefix = trie.isPrefix(word + boggleMatrix[x][y]);

      return isPrefix;
    });

    validAdjacents.forEach((adjacent) => {
      used.push(position);

      const [x, y] = adjacent;
      const letter = boggleMatrix[x][y];
      const currentWord = word + letter;

      solve(currentWord, adjacent, coords, used);
    });
  };

  // solve each letter in turn
  boggleMatrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      solve(boggleMatrix[rowIndex][colIndex], [rowIndex, colIndex]);
    });
  });

  // create a trie from the resulting word list
  const resultTrie = triePrefixTree(list);

  return {
    full,
    list,
    hasWord(word) {
      return resultTrie.hasWord(word);
    },

    contains(letters) {
      const arr = Array.from(letters);
      return list.filter(word => arr.every(letter => word.includes(letter)));
    },

    startsWith(prefix) {
      return resultTrie.getPrefix(prefix);
    },

    endsWith(suffix) {
      return list.filter((word) => {
        const wordLen = word.length;
        const startAt = wordLen - suffix.length;
        return word.substring(startAt, wordLen) === suffix.toLowerCase();
      });
    },

    lengthOf(length) {
      return list.filter(word => word.length === length);
    },
  };
};
