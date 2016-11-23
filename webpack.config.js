module.exports = {
  context: __dirname,
  entry: "./lib/airdng.js",
  output: {
    path: "./lib/",
    filename: "bundle.js"
  },
    module: {
    loaders: [
      {
        test: [/\.js?$/, /\.csv$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /\.json$/,
        loader: 'raw-loader'
      }
    ]
  },
  node: {
    fs: "empty"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  }
};
