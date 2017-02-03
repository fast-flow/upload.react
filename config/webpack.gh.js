var path = require('path')
var webpack = require('webpack')
var iPackage = require('../package.json')

module.exports = require('./webpack.config')({
    entry: ["babel-polyfill", './example/dev'],
    devtool: 'source-map',
    externals: {},
    lastPlugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false
           }
        })
    ],
    output: {
        path: path.join(__dirname, '../output'),
        filename: 'example/dev.js',
        chunkFilename: '/chunk/[id]-[name]-[chunkhash].js',
        publicPath: '/' + iPackage.gitRepository + '/' + iPackage.version
    }
})
