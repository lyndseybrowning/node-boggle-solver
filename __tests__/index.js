import index from '../src/index';

describe('Solver', () => {
  it('has a solve method', () => {
    const { solve } = index();

    expect(solve).toBeDefined();
  });

  it('throws when the custom dictionary is not an array with at least one value', () => {
    expect(() => index('')).toThrow();
  });

  it('accepts a custom dictionary as the first parameter', () => {
    expect(() => index(['hello', 'word'])).not.toThrow();
  });

  it('throws when the number of letters passed does not form a valid matrix', () => {
    expect(() => solve('abc def ghij')).toThrow();
  });
});
