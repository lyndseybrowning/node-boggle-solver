import triePrefixTree from 'trie-prefix-tree';
import getDictionary from './getDictionary';
import config from './config';
import utils from './utils';
import initSolver from './initSolver';

const MIN_SIZE = config.minSize;
const MIN_MATRIX = MIN_SIZE * MIN_SIZE;
const MIN_WORD_LEN = config.minWordLen;
const DEFAULT_DICTIONARY = getDictionary();
const DEFAULT_TRIE = triePrefixTree(DEFAULT_DICTIONARY);

export default function solver(custom = []) {
  if (!Array.isArray(custom)) {
    throw('Custom dictionary should be an array with at least one value');
  }

  const isCustom = custom.length > 0;
  const trie = isCustom ? triePrefixTree(custom) : DEFAULT_TRIE;

  return {
    solve(boggle, callback, minWordLen = MIN_WORD_LEN) {
      if (!callback || typeof callback !== 'function') {
        throw('Expected callback function');
      }

      if (typeof boggle !== 'string' || boggle === '') {
        callback('Use uppercase, lowercase or space-delimited characters');
      }

      const letters = /\s/.test(boggle) ? boggle.replace(/\s/g, '') : boggle;
      const numLetters = letters.length;

      if (numLetters < MIN_MATRIX) {
        callback(`Enter ${MIN_MATRIX} letters or more`);
      }

      const boggleSize = utils.boggleSize(numLetters);

      if (boggleSize === 0) {
        callback('Enter a valid number of letters, eg. 9 for 3x3, 16 for 4x4');
      }

      if (typeof minWordLen !== 'number' || minWordLen < MIN_WORD_LEN) {
        callback(`Minimum word length is ${MIN_WORD_LEN}`);
      }

      const result = initSolver(letters, boggleSize, trie, minWordLen);

      return callback(null, result);
    },
  };
};
