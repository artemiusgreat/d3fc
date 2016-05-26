const stochasticOscillator = require('../build/d3fc-technical-indicator').stochasticOscillator;
const readCsv = require('./readcsv.js');

describe('stochasticOscillator', () => {
    it('should match the expected output', done => {
        Promise.all([
            readCsv('./test/data/input.csv'),
            readCsv('./test/data/stochastic.csv')
        ])
        .then(result => {
            const input = result[0];
            const expectedOutput = result[1];

            const rsi = stochasticOscillator()
                .closeValue(d => d.Close)
                .lowValue(d => d.Low)
                .highValue(d => d.High);
            const output = rsi(input);
            expect(output.map(d => d.k))
                .toBeEqualWithTolerance(expectedOutput.map(d => d.K));
            expect(output.map(d => d.d))
                .toBeEqualWithTolerance(expectedOutput.map(d => d.D));
        })
        .then(done, done.fail);
    });
});
