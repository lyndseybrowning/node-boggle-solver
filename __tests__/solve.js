import solver from "../src/index";
import config from "../src/config";
import "./extends";

describe("Solver", () => {
    const customWordList = ["hello", "world", "love", "coding"];
    const { solve } = solver(customWordList);
    const callback = (err, result) => {
        if (err) {
            throw err;
        }
    };

    it("expects a callback function", () => {
        expect(() => solve("abc", null)).toThrow();
    });

    it("returns the error callback when the first parameter is not a string", () => {
        expect(() => solve(123, callback)).toThrow();
    });

    it("throws when an empty string is passed as the first parameter", () => {
        expect(() => solve("", callback)).toThrow();
    });

    it(`expects a minimum of ${
        config.minSize * config.minSize
    } letters`, () => {
        expect(() => solve("abc", callback)).toThrow();
        expect(() => solve("abcdefghi", callback)).not.toThrow();
    });

    it("accepts space-delimited letters", () => {
        expect(() => solve("abc def", callback)).toThrow();
        expect(() => solve("abc def ghi", callback)).not.toThrow();
    });

    it("expects an even number of letters to form a matrix, e.g. 9 for 3x3, 16 for 4x4", () => {
        expect(() => solve("abc def ghi", callback)).not.toThrow();
        expect(() => solve("abcdefghijklmnop", callback)).not.toThrow();
        expect(() => solve("abc def ghij", callback)).toThrow();
        expect(() =>
            solve(
                "lotsandlotsofrandomcharactersthatdontformamatrixsize",
                callback,
            ),
        ).toThrow();
    });

    it("throws when the minimum word length is less than specified in the config", () => {
        const minWordLen = config.minWordLen;

        expect(() => solve("abcdefghi", callback, minWordLen - 1)).toThrow();
    });

    it("returns an object", (done) => {
        const defaultSolver = solver();

        defaultSolver.solve("abcdefghi", (err, result) => {
            if (err) {
                return done.fail(err);
            }

            expect(result).toBeDefined();
            expect(result.full).toBeDefined();
            expect(result.list).toBeDefined();

            expect(result.contains).toBeDefined();
            expect(result.contains("abd")).toBeArray();

            expect(result.hasWord).toBeDefined();
            expect(result.hasWord("badge")).toEqual(true);
            expect(result.hasWord("blahblah")).toEqual(false);

            expect(result.startsWith).toBeDefined();
            expect(result.startsWith("b")).toBeArray();
            expect(result.startsWith("zzzz").length).toEqual(0);

            expect(result.endsWith).toBeDefined();
            expect(result.endsWith("d").length).toBeGreaterThan(1);

            expect(result.lengthOf).toBeDefined();
            expect(result.lengthOf(4)).toBeArray();

            done();
        });
    });
});
