exports.calcAccuracy = (predPlaces) => {
    const finalPlaces = {
        semi: ['NGA', 'COD', 'CPV', 'CIV'],
        final: ['CPV', 'NGA'],
        winner: ['NGA']
    };
    accuracy = 0;
    total = 0;
    for (let round in finalPlaces) {
        for (let pred of predPlaces[round]) {
            if (finalPlaces[round].indexOf(pred) != -1) {
                accuracy++;
            }
            total++;
        }
    }
    return Math.round((accuracy / total) * 10000) / 100;
}