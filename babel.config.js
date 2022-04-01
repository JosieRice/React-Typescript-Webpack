/** this set of babel options are just for the jest test environment */
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript',
    ],
};
