import './extends';
import solveBoggle from '../src/solveBoggle';
import config from '../src/config';

describe('The Boggle solver', () => {
  it('throws when the second parameter is not an array or the array is empty', () => {
    expect(() => solveBoggle('abc def ghi')).toThrow();
    expect(() => solveBoggle('abc def ghi', [])).toThrow();
  });

  it('throws when the minimum word length is less than specified in the config', () => {
    const minWordLen = config.minWordLen;

    expect(() => solveBoggle('abcdefghi', ['hello'], minWordLen - 1)).toThrow();
  });

  it('returns an array', () => {
    expect(solveBoggle('abc def ghi', ['hello', 'world'])).toBeArray();
  });
});
