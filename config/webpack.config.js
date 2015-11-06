// config/webpack.config.js
var webpack = require('webpack');
var path = require('path');
var APP_MODULES_DIR = path.resolve('app/client');

module.exports = {
  // set up entrypoints in the usual way (see below for an automated multi-bundle approach)
  entry: 'main.js',
  output: {
    // output filenames must end in .bundle.js (.bundle.css for ExtractTextPlugin)
    filename: 'main.bundle.js',
    // webpack must output bundles here
    path: './tmp/webpack',
    // required for asset urls (eg. images) to be rewritten by rails' asset_path helper
    publicPath: '$asset_root/',
  },
  resolve: {
    root: [
      APP_MODULES_DIR,
    ],
  },
  // configure some loaders
  module: {
    loaders: [
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ],
  },
};
