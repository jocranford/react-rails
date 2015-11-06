// config/webpack.config.js
var webpack = require('webpack');

module.exports = {
  // set up entrypoints in the usual way (see below for an automated multi-bundle approach)
  entry: 'app/client/main.js',
  output: {
    // output filenames must end in .bundle.js (.bundle.css for ExtractTextPlugin)
    filename: 'main.bundle.js',
    // webpack must output bundles here
    path: './tmp/webpack',
    // required for asset urls (eg. images) to be rewritten by rails' asset_path helper
    publicPath: '$asset_root/',
  },
  // configure some loaders
  module: {
    loaders: [
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ],
  },
};
