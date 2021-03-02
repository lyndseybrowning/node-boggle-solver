import fs from "fs";
import path from "path";
import config from "./config";

export default function getDictionary(dictionary = config.dictionary.sowpods) {
    try {
        const file = path.join(__dirname, dictionary);
        const array = fs
            .readFileSync(file)
            .toString()
            .split("\n")
            .map(str => str.toLowerCase());

        return array;
    } catch (err) {
        return [];
    }
};
