module.exports = {
  entry: {
    "app": "./src/js/index.js",
  },
  output: {
    path: './build/',
    filename: "[name].js"
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    }],
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  eslint: {
    configFile: './.eslintrc'
  }
};

