import utils from "../src/utils";

describe("Array match", () => {
    it("checks if the target array exists in the provided 2-d array", () => {
        const source = [[0, 0]];
        const target = [0, 0];

        expect(utils.arrayMatch(source, target)).toEqual(true);
        expect(
            utils.arrayMatch(
                [
                    [1, 0],
                    [1, 1],
                ],
                [1, 2],
            ),
        ).toEqual(false);
    });
});

test("Validating boggle matrix size", () => {
    expect(utils.boggleSize(10)).toEqual(0);
    expect(utils.boggleSize(9)).toEqual(3);
    expect(utils.boggleSize(16)).toEqual(4);
});

test("retrieving a matrix from given letters", () => {
    const actual = utils.getBoggleMatrix(3, "abcdefghi");
    const expected = [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
    ];

    expect(actual).toEqual(expected);
});
