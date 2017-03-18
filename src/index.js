import getDictionary from './getDictionary';
import config from './config';
import utils from './utils';
import initSolver from './initSolver';

const MIN_SIZE = config.minSize;
const MIN_MATRIX = MIN_SIZE * MIN_SIZE;
const MIN_WORD_LEN = config.minWordLen;

export default function solver(customDictionary = []) {
  if (!Array.isArray(customDictionary)) {
    throw('Custom dictionary should be an array with at least one value');
  }

  const isCustomDict = customDictionary.length > 0;
  const dictionary = isCustomDict ? customDictionary : getDictionary();

  return {
    solve(boggle, minWordLen = MIN_WORD_LEN) {
      if (typeof boggle !== 'string' || boggle === '') {
        throw(`
          Expected uppercase, lowercase
          or space-delimited characters e.g. solve('ABC DEF GHI').
          Received ${boggle}.
        `);
      }

      if (/\s/.test(boggle)) {
        boggle = boggle.replace(/\s/g, '');
      }

      const numLetters = boggle.length;

      if (numLetters < MIN_MATRIX) {
        throw(`
          Please enter a minimum of ${MIN_MATRIX} letters
          for a ${MIN_SIZE}x${MIN_SIZE} solver
        `);
      }

      const boggleSize = utils.boggleSize(numLetters);

      if (boggleSize === 0) {
        throw('Enter a valid number of letters, eg. 9 for 3x3, 16 for 4x4');
      }

      if (typeof minWordLen !== 'number' || minWordLen < MIN_WORD_LEN) {
        throw(`Min word length should be equal to or greater than ${MIN_WORD_LEN}`);
      }

      return initSolver(boggle, dictionary, minWordLen);
    },
  };
};
