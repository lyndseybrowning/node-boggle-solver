expect.extend({
  toBeArray(argument) {
    const pass = Array.isArray(argument);

    return {
      message() {
        pass
        ? `expected ${argument} to be an Array`
        : `expected ${argument} to not be an Array`;
      },
      pass
    };
  }
});
