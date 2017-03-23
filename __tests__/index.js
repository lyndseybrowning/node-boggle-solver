import index from '../src/index';

describe('Solver', () => {
  it('has a solve method', () => {
    const { solve } = index();
    expect(solve).toBeDefined();
  });

  it('returns an error when the custom dictionary is not an array with at least one value', () => {
    expect(() => index('')).toThrow();
  });

  it('Allows a custom dictionary as the first parameter', () => {
    expect(() => index(['hello', 'word'])).not.toThrow();
  });
});
