import triePrefixTree from 'trie-prefix-tree';
import config from './config';

const MIN_WORD_LEN = config.minWordLen;

export default function solveBoggle(boggle, dictionary, minWordLen = MIN_WORD_LEN) {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    throw('solveBoggle expects an array as the second parameter');
  }

  if (typeof minWordLen !== 'number' || minWordLen < MIN_WORD_LEN) {
    throw(`Min word length should be equal to or greater than ${MIN_WORD_LEN}`);
  }

  return [];
};
