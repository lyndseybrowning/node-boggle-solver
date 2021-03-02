import solver from "../src/index";
import config from "../src/config";

describe("Solver", () => {
    const customWordList = ["hello", "world", "love", "coding"];
    const { solve } = solver(customWordList);

    it("should throw when the first parameter is not a string", () => {
        expect(() => solve(123)).toThrow();
    });

    it("should throw when an empty string is passed as the first parameter", () => {
        expect(() => solve("")).toThrow();
    });

    it(`expects a minimum of ${config.minSize * config.minSize} letters`, () => {
        expect(() => solve("abc")).toThrow();
        expect(() => solve("abcdefghi")).not.toThrow();
    });

    it("accepts space-delimited letters", () => {
        expect(() => solve("abc def")).toThrow();
        expect(() => solve("abc def ghi")).not.toThrow();
    });

    it("expects an even number of letters to form a matrix, e.g. 9 for 3x3, 16 for 4x4", () => {
        expect(() => solve("abc def ghi")).not.toThrow();
        expect(() => solve("abcdefghijklmnop")).not.toThrow();
        expect(() => solve("abc def ghij")).toThrow();
        expect(() => solve("lotsandlotsofrandomcharactersthatdontformamatrixsize")).toThrow();
    });

    it("should throw when the minimum word length is less than specified in the config", () => {
        const minWordLen = config.minWordLen;

        expect(() => solve("abcdefghi", minWordLen - 1)).toThrow();
    });

    it("should return a model that contains the full word list", () => {
        const result = solver(["hello", "world", "rest", "last", "old", "hew"]).solve(
            "helloworldlarest",
        );

        expect(result).toMatchObject(
            expect.objectContaining({
                full: expect.any(Array),
                list: expect.any(Array),
                contains: expect.any(Function),
                hasWord: expect.any(Function),
                lengthOf: expect.any(Function),
                startsWith: expect.any(Function),
                endsWith: expect.any(Function),
            }),
        );

        expect(result.contains("he")).toEqual(["hello", "hew"]);
        expect(result.hasWord("last")).toBe(true);
        expect(result.hasWord("blahblah")).toBe(false);
        expect(result.startsWith("zzzz").length).toEqual(0);
        expect(result.endsWith("d").length).toBe(2);
        expect(result.lengthOf(3)).toEqual(["hew", "old"]);
    });
});
