const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    target: 'electron-renderer',
    entry: {
      renderer: path.join(__dirname, 'src/renderer.jsx')
    },
    output: {
      filename: 'renderer.jsx',
      path: path.join(__dirname, 'build')
    },
    devtool: 'inline-source-map',
    node: {
      __dirname: true,
      __filename: false,
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/template.html'
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    externals: {
      winprocess: 'require(require("path").resolve(__dirname, "winprocess"))'
    },
    resolve: {
      extensions: [ '.js', '.jsx', '.json' ]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: [
              ['env', {
                targets: {
                  electron: '1.6.14'
                },
                useBuiltIns: true
              }]
            ],
            plugins: ['transform-react-jsx']
          }
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          options: {
            limit: 25000,
            prefix: path.join(__dirname, 'build')
          }
        },
        {
          test: /\.(woff|ttf)$/,
          loader: 'url-loader',
          options: {
            limit: 25000,
            prefix: path.join(__dirname, 'build')
          }
        }
      ]
    }
  },
  {
    target: 'electron',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'build')
    },
    devtool: 'inline-source-map',
    node: {
      __dirname: false,
      __filename: false
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version
      })
    ]
  }
]
