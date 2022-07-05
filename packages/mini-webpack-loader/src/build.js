const webpack = require('webpack')

const compiler = webpack({
  entry: './index.js',
  output: {
    filename: '[name].[contenthash:8].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.testjson$/,
        use: "../json-loader/"
      }
    ]
  }
})
compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.toString({
    colors: true
  }))
})
