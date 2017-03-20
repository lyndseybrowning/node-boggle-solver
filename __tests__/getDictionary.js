import getDictionary from '../src/getDictionary';
import config from '../src/config';

describe('Getting the default dictionary', () => {
  it('returns an array', () => {
    const actual = Array.isArray(getDictionary());
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('returns at least one item', () => {
    expect(getDictionary().length).toBeGreaterThan(1);
  });

  it('returns an empty array when the dictionary file is not found', () => {
    const actual = getDictionary('lib/test.txt');
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('maps items to lowercase', () => {
    const actual = getDictionary();
    const top10 = actual.slice(0, 10);

    top10.forEach((item) => {
      expect(item).toEqual(item.toLowerCase());
    });
  });
});
