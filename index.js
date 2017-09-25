const postcss = require('postcss');

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
