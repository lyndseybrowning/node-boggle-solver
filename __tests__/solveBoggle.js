import './extends';
import solveBoggle from '../src/solveBoggle';

describe('The Boggle solver', () => {
  it('returns an array', () => {
    expect(solveBoggle('abc def ghi')).toBeArray();
  });
});
