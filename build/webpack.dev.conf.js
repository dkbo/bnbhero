var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const isProdServer = () => process.argv.indexOf('-prod') !== -1
const is141Server = () => process.argv.indexOf('-141') !== -1
const is201Server = () => process.argv.indexOf('-201') !== -1
const isNewFeature = () => process.argv.indexOf('-new_feature') !== -1
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

let test = ''
if (isProdServer()) {
    test = 'prd'
} else if(is141Server()) {
    test = 'ot'
} else if(is201Server()) {
    test = 'prod_1'
} else if(isNewFeature()) {
    test = 'prod'
}

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
            'process.test': JSON.stringify(test)
        }),
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunksSortMode: 'none'
        }),
        new FriendlyErrorsPlugin()
    ]
})