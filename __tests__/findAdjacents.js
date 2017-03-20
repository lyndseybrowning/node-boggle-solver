import findAdjacents from '../src/findAdjacents';

describe('Finding adjacent positions in a 2-d matrix', () => {
  it('returns valid positions', () => {
    const actual = findAdjacents([0, 0], 3);
    const expected = [[0, 1], [1, 0], [1, 1]];

    expect(actual).toEqual(expected);
  });

  it('filters unwanted positions', () => {
    const actual = findAdjacents([0, 0], 3, [[1, 1], [1, 0]]);
    const expected = [[0, 1]];

    expect(actual).toEqual(expected);
  });
});
