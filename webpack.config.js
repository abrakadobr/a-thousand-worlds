const path = require('path')
const webpack = require('webpack')
//const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  watch: true,
  mode: 'development',
  performance: { hints: false },
  entry: {
    app: ['@babel/polyfill',__dirname+'/src2/app.js'],
    //scss: __dirname+'/src2/scss/main.scss',
    less: __dirname+'/src2/less/main.less'
  },
  output: {
    library: 'bundlelib',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: __dirname+ '/build2'
    //publicPath: '/js/'
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // disable creating additional chunks
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env',{useBuiltIns:'entry',corejs:3}]]
          }
        }
      },{
        test: /\.less$/i,
        use: ['style-loader','css-loader','less-loader']
      },{
        test: /\.s(c|a)ss$/i,
        use: ['style-loader','css-loader','sass-loader']
      },{
        test: /\.css$/i,
        use: ['style-loader','css-loader']
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: Infinity
          }
        }]
      },
      {
        test: /\.(png|ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: Infinity
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      vue: process.env.NODE_ENV === 'production'?'vue/dist/vue.esm.browser.min':'vue/dist/vue.esm.js',
      'firebase/app': 'firebase/app/dist/index.cjs.js'
    },
    extensions: ['.js','.css','.scss','.less']
  }

}
