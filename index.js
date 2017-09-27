const postcss = require('postcss');
const chalk = require('chalk');

module.exports = postcss.plugin('postcss-colorfix', function (opts) {
    opts = opts || {};
    const colorMap = opts.colors;

    if (!colorMap || !Object.keys(colorMap).length) {
        throw new Error('Please provide a color map. Look for examples');
    }

    const nearestColor = require('nearest-color')
        .from(Object.keys(opts.colors));

    return function (root, result) {
        const analysis = [];
        const warning = chalk.hex('#D46946').bold;
        const error = chalk.hex('#FFFFFF').bgHex('#B5715B');
        const success = chalk.bgHex('#DAE6CF');

        root.walkDecls(/^color|background|fill|border.*/, decl => {
            let value = decl.value;
            const selector = decl.parent.selector;
            if (decl.prop.includes('border')) {
                const allValues = value.split(' ');
                const borderTypes = ['solid', 'dashed', 'dotted'];
                allValues.forEach(val => {
                    if (!borderTypes.includes(val) && !val.match(/^(\d+).*/)) {
                        value = val;
                    }
                });
            }

            const correctedColor = nearestColor(value);

            if (correctedColor) {
                console.log(warning(`postcss-colorfix warning: 
                "${selector}" uses ${error(value)} ${decl.prop}. 
                 Closest variable is ${success(colorMap[correctedColor])}`));

                analysis.push({
                    originalColor: value,
                    correctedColor: correctedColor,
                    correctColorVariable: colorMap[correctedColor],
                    property: decl.prop,
                    selector
                });
            }
        });
        result.analysis = analysis;
    };
});
