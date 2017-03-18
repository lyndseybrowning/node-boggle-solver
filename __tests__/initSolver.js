import './extends';
import initSolver from '../src/initSolver';

describe('The Boggle solver', () => {
  it('returns an array', () => {
    expect(initSolver('abc def ghi', ['hello', 'world'])).toBeArray();
  });
});
