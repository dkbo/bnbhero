var path = require('path')
var config = require('../config')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const filterGradient = require('postcss-filter-gradient')
const autoprefixer = require('autoprefixer')
const browsers = [
    '> 1%',
    'last 7 versions',
    'not ie <= 8'
]
exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                autoprefixer({
                    browsers
                }),
                filterGradient({
                    skipWarnings: true
                })
            ],
            sourceMap: options.sourceMap
        }
    }
  // generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
        var loaders = [cssLoader, postcssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

    // Extract CSS when that option is specified
    // (which is the case during production build)
        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
