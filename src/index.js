import triePrefixTree from 'trie-prefix-tree';
import getDictionary from './getDictionary';
import config from './config';

const MIN_SIZE = config.min_size;
const MIN_MATRIX = MIN_SIZE * MIN_SIZE;

export default function solver(customDictionary = []) {
  if(!Array.isArray(customDictionary)) {
    throw('Custom dictionary should be an array with at least one value');
  }

  const isCustomDict = customDictionary.length > 0;
  const dictionary = isCustomDict ? customDictionary : getDictionary();
  const trie = triePrefixTree(dictionary);

  return {
    solve(boggle) {
      if(typeof boggle !== 'string' || boggle === '') {
        throw(`Solve method expects a string in uppercase, lowercase or space-delimited e.g. solve('ABC DEF GHI')`);
      }

      if(boggle.includes(` `)) {
        boggle = boggle.replace(/\s/g, '');
      }

      const numLetters = boggle.length;

      if(numLetters < MIN_MATRIX) {
        throw(`Please enter a minimum of ${MIN_MATRIX} letters for a ${MIN_SIZE}x${MIN_SIZE} solver`);
      }
    }
  };
};
