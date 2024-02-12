exports.calcAccuracy = (predPlaces) => {
    const finalPlaces = {
        semi: ['NGA', 'ZAF', 'COD', 'CIV'],
        final: ['NGA', 'CIV'],
        winner: ['CIV'],
    };
    accuracy = 0;
    total = 0;
    for (let round in finalPlaces) {
        for (let pred of predPlaces[round]) {
            if (finalPlaces[round].indexOf(pred) != -1) {
                accuracy++;
            }
        }
        total += finalPlaces[round].length;
    }
    return Math.round((accuracy / total) * 10000) / 100;
};
