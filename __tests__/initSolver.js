import './extends';
import initSolver from '../src/initSolver';

describe('The Boggle solver', () => {
  it('returns an array', () => {
    expect(initSolver('abcdefghi', 3, ['badge', 'bad', 'feh', 'dogs'])).toBeArray();
  });
});
