import config from "./config";

export default {
    /**
  * Determines the size of the matrix
  * based on the number of characters passed in
  * A 0 (zero) is returned for an invalid size
  * eg. boggleSize(9) // 3
  * eg. boggleSize(10) // 0
  * @returns Number
  */
    boggleSize(size) {
        let counter = config.minSize;

        while (counter < size) {
            const matrixSize = counter * counter;

            if (matrixSize === size) {
                return counter;
            }

            counter += 1;
        }

        return 0;
    },

    /**
  * Checks if the target exists in source
  * Both are 2-d arrays e.g. arrayMatch([[0, 0]], [0, 0]); => true
  * @returns Boolean
  */
    arrayMatch(source, target) {
        return source.some((item) => {
            return item.every((x, index) => {
                return x === target[index];
            });
        });
    },

    getBoggleMatrix(size, letters) {
        const matrix = [];
        let counter = 0;

        [].reduce.call(letters, (acc, letter, index) => {
            counter += 1;
            acc.push(letter);

            if (counter === size) {
                matrix.push(acc);
                acc = [];
                counter = 0;
            }

            return acc;
        }, []);

        return matrix;
    },
};
