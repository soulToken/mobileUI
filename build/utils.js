var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
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
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        //背景图片问题
        publicPath:'../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // return {
  //   css: generateLoaders(),
  //   postcss: generateLoaders(),
  //   less: generateLoaders('less'),
  //   sass: generateLoaders('sass', { indentedSyntax: true }),
  //   scss: generateLoaders('sass'),
  //   stylus: generateLoaders('stylus'),
  //   styl: generateLoaders('stylus')
  // }
  const stylusOptions = {
    'resolve url': true,
     // 这里 新增 import 配置项，指向自定义主题文件
     import: [path.resolve(__dirname, '../src/theme')]
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus', stylusOptions),
    styl: generateLoaders('stylus', stylusOptions)
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
