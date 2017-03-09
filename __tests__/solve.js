import solver from '../src/index';
import config from '../src/config';
import './extends';

describe('Solver', () => {
  const customWordList = ['hello', 'world', 'love', 'coding'];
  const { solve } = solver(customWordList);

  it('throws when the first parameter is not a string', () => {
    expect(() => solve(123)).toThrow();
    expect(() => solve(undefined)).toThrow();
    expect(() => solve([])).toThrow();
  });

  it('throws when an empty string is passed as the first parameter', () => {
    expect(() => solve('')).toThrow();
  });

  it(`expects a minimum of ${config.min_size * config.min_size} letters`, () => {
    expect(() => solve('abc')).toThrow();
    expect(() => solve('abcdefghi')).not.toThrow();
  });

  it('accepts space-delimited letters', () => {
    expect(() => solve('abc def')).toThrow();
    expect(() => solve('abc def ghi')).not.toThrow();
  });

  it('expects an even number of letters to form a matrix, e.g. 9 for 3x3, 16 for 4x4', () => {
    expect(() => solve('abc def ghi')).not.toThrow();
    expect(() => solve('abcd efgh ijkl mnop')).not.toThrow();
    expect(() => solve('serspatglinesers')).not.toThrow();
    expect(() => solve('abc def ghij')).toThrow();
    expect(() => solve('lotsandlotsofrandomcharactersthatdontformamatrixsize')).toThrow();
  });

  it('returns an array', () => {
    expect(solve('abc def ghi')).toBeArray();
  });
});
