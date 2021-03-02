import triePrefixTree from "trie-prefix-tree";

import config from "./config";
import utils from "./utils";
import initSolver from "./initSolver";

const GRID_SIZE = config.minSize;
const MIN_LETTERS_ALLOWED = GRID_SIZE * GRID_SIZE;
const MIN_WORD_LEN = config.minWordLen;

function solver(dictionary) {
    if (!Array.isArray(dictionary)) {
        throw new Error("Custom dictionary should be an array with at least one value");
    }

    const trie = triePrefixTree(dictionary);

    return {
        solve(string, minWordLen = MIN_WORD_LEN) {
            if (typeof string !== "string" || string === "") {
                throw new Error("Use uppercase, lowercase or space-delimited characters");
            }

            const isSpaceDelimited = /\s/.test(string);
            const letters = isSpaceDelimited ? string.replace(/\s/g, "") : string;
            const numLetters = letters.length;

            if (numLetters < MIN_LETTERS_ALLOWED) {
                throw new Error(`Enter ${MIN_LETTERS_ALLOWED} letters or more`);
            }

            const boggleSize = utils.boggleSize(numLetters);

            if (boggleSize === 0) {
                throw new Error("Enter a valid number of letters, eg. 9 for 3x3, 16 for 4x4");
            }

            if (typeof minWordLen !== "number" || minWordLen < MIN_WORD_LEN) {
                throw new Error(`Minimum word length is ${MIN_WORD_LEN}`);
            }

            const result = initSolver(letters, boggleSize, trie, minWordLen);

            return result;
        },
    };
}

export default solver;
