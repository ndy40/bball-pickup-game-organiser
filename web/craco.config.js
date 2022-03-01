const { resolve } = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': resolve(__dirname, './src/components/'),
            '@pages': resolve(__dirname, 'src/pages/'),
            '@utilities': resolve(__dirname, 'src/utilities/'),
            '@assets': resolve(__dirname, 'src/assets/'),
            '@hooks': resolve(__dirname, 'src/hooks/'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    },
};