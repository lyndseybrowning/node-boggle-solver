import index from '../src/index';

describe('Solver', () => {
  it('has a solve method', () => {
    const { solve } = index();

    expect(solve).toBeDefined();
  });
});
