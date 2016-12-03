
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
        test: [/\.js?$/, /\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
        test: /\.json$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.gif$/,
        loader: 'file'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
