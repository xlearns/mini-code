const webpack = require('webpack')
// 加载plugin
const HtmlWebpackPlugin = require('../plugin');


const compiler = webpack({
  entry:"./index.js",
  output:{
    clear:true,
    filename: '[name].[contenthash:8].js',
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:"hello world",
    })
  ]
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