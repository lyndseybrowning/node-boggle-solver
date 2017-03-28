import './extends';
import initSolver from '../src/initSolver';
import triePrefixTree from 'trie-prefix-tree';

describe('The Boggle solver', () => {
  it('returns an object', () => {
    const trie = triePrefixTree(['badge', 'bad', 'feh', 'dogs']);
    expect(initSolver('abcdefghi', 3, trie).full).toBeDefined();
  });
});
