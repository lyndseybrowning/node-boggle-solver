import utils from '../src/utils';

describe('Array match', () => {
  it('checks if the target array exists in the provided 2-d array', () => {
    const source = [[0, 0]];
    const target = [0, 0];

    expect(utils.arrayMatch(source, target)).toEqual(true);
    expect(utils.arrayMatch([[1, 0], [1, 1]], [1, 2])).toEqual(false);
  });
});
