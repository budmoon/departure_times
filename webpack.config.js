module.exports = {
  entry: './app/js/main.js'
 ,output: {path: __dirname + '/app/build', filename: '[name].js'}
 ,module: {
    loaders: [{test: /\.js?$/
              ,loader: 'babel-loader'
              ,query: {presets: ['es2015', 'react']}
              ,exclude: /node_modules/ }]}
 ,plugins: []
};
