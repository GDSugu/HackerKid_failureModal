const path = require('path');
const glob = require('glob');
const fs = require('fs');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');
const commonFunctions = require('./commonFunctions');

const htmlFilePaths = commonFunctions.list('./src/web/*.html');

const getIOPaths = () => {
  let inputPaths = {};
  htmlFilePaths.map((filePath) => {
    console.log(filePath);
    let respectiveDirectory = filePath.substring(10).slice(0, -5);
    let jsPath = path.join(config.root, config.paths.src, 'web', 'javascripts', respectiveDirectory, 'index.js');
    let cssPath = path.join(config.root, config.paths.src, 'web', 'stylesheets', respectiveDirectory, 'style.css');
    let scssPath = path.join(config.root, config.paths.src, 'web', 'stylesheets', respectiveDirectory, 'style.scss');
    let assetsPresent = [fs.existsSync(jsPath) && jsPath, fs.existsSync(cssPath) && cssPath, fs.existsSync(scssPath) && scssPath].filter(Boolean);
    if(assetsPresent.length){
      inputPaths[respectiveDirectory] = assetsPresent;
    }
  });
  return inputPaths;
}

const inputPaths = getIOPaths();

const ASSET_PATH = '/';

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: inputPaths,
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: '[name].[hash].js',
    publicPath: ASSET_PATH,
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.src),
    watchContentBase: true,
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host,
    historyApiFallback: {
      rewrites: [],
    },
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      name: config.env === 'production' ? false : true,
      // increase it if u want duplicate free bundle, but number of request may increase resulting in more overhead of request of js files. Think Wise!
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
    },
  },
  resolve: {
    alias: {
      '@formatjs/icu-messageformat-parser': '@formatjs/icu-messageformat-parser/no-parser',
    },
  },
};
