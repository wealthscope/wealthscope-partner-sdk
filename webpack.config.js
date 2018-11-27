const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const libraryName = pkg.name;

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /(\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js']
    }
}

module.exports = config;