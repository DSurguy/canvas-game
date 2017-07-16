var path = require('path');
module.exports = {
    entry: ["babel-polyfill", './app.js'],
    output: {
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: './node_modules/.cache/babel-loader'
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
}