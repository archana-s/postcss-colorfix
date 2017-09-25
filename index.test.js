const postcss = require('postcss');
const fs = require('fs');
const plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            console.log(result.analysis);
            expect(JSON.stringify(result.analysis)).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('analyzes the CSS and expects to see the results', () => {
    const inputCss = fs.readFileSync('./test/main.css', 'utf-8');
    const colorMap = {
        '#2c0e66': '--color-primary',
        '#ce1616': '--color-error',
        '#CEA043': '--color-alert',
        '#40545D': '--color-accent-main',
        '#6D6D6D': '--color-text-caption',
        '#3F51B5': '--color-text-link',
        '#FFFFFF': '--color-white-g1',
        '#4B4C22': '--color-accent-hotel',
        '#F4F3EE': '--color-white-g2',
        '#A4F1A1': '--color-success-g2',
        '#F7D2D2': '--color-danger-g1',
        '#CACADB': '--theme-user-input'
    };
    const outputAnalysis = fs.readFileSync('./test/result', 'utf-8');
    return run(inputCss, outputAnalysis, { colors: colorMap });
});

