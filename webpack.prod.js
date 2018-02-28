const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const [ major, minor, patch ] = process.env.npm_package_compatVersion.split('.')

module.exports = [
  {
    target: 'electron-renderer',
    entry: {
      renderer: path.join(__dirname, 'src/renderer.tsx')
    },
    output: {
      filename: 'renderer.js',
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
        NODE_ENV: 'production',
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version,
        MAJOR: major,
        MINOR: minor,
        PATCH: patch
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/template.html'
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BabiliPlugin({
        keepFnName: true
      })
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
          loader: 'babel-loader'
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
    entry: path.join(__dirname, 'src/index.ts'),
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
        NODE_ENV: 'production',
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BabiliPlugin({
        keepFnName: true
      })
    ],
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    }
  }
]
