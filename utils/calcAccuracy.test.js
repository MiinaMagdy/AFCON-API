const { calcAccuracy } = require("./calcAccuracy");

describe("Testing calculate accuracy", () => {
    const predPlaces = {
        semi: ['ZAF', 'CIV'],
        final: ['CPV', 'NGA'],
        winner: ['NGA']
    };
    test("should return correct accuracy", () => {
        const acc = calcAccuracy(predPlaces);
        expect(acc).toBe(57.14);
    });
});