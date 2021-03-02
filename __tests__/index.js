import index from "../src/index";

describe("Solver", () => {
    it("returns an error when the custom dictionary is not an array with at least one value", () => {
        expect(() => index("")).toThrow();
    });
});
