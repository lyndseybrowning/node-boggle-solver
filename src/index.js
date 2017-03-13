import getDictionary from './getDictionary';
import config from './config';
import utils from './utils';
import solveBoggle from './solveBoggle';

const MIN_SIZE = config.minSize;
const MIN_MATRIX = MIN_SIZE * MIN_SIZE;

export default function solver(customDictionary = []) {
  if (!Array.isArray(customDictionary)) {
    throw('Custom dictionary should be an array with at least one value');
  }

  const isCustomDict = customDictionary.length > 0;
  const dictionary = isCustomDict ? customDictionary : getDictionary();

  return {
    solve(boggle) {
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

      return solveBoggle(boggle, dictionary);
    },
  };
};
