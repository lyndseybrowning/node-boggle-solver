import config from './config';

export default {
  /**
  * Determines the size of the matrix based on the number of characters passed in
  * A 0 (zero) is returned for an invalid size
  * eg. boggleSize(9) // 3
  * eg. boggleSize(10) // 0
  * @returns Number
  */
  boggleSize(size) {
    let counter = config.minSize;

    while(counter < size) {
      const matrixSize = counter * counter;

      if (matrixSize === size) {
        return counter;
      }

      counter++;
    }

    return 0;
  }
};
