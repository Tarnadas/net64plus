const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getCompatMin = require('./compat-list')

const [ major, minor, patch ] = process.env.npm_package_compatVersion.split('.')
const [ packageMajor, packageMinor, packagePatch ] = process.env.npm_package_version.split('.')
const [ compatMinMajor, compatMinMinor ] = getCompatMin(process.env.npm_package_version)

module.exports = [
  {
    target: 'electron-renderer',
    mode: 'production',
    entry: {
      renderer: path.join(__dirname, 'src/renderer/index.tsx')
    },
    output: {
      filename: 'renderer.js',
      path: path.join(__dirname, 'build')
    },
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
        PATCH: patch,
        PACKAGE_MAJOR: packageMajor,
        PACKAGE_MINOR: packageMinor,
        PACKAGE_PATCH: packagePatch,
        COMPAT_MIN_MAJOR: compatMinMajor,
        COMPAT_MIN_MINOR: compatMinMinor
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/renderer/template.html'
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css'
      }),
    ],
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: {
            //   presets: ['minify']
            // }
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
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]
        }
      ]
    }
  },
  {
    target: 'electron-main',
    mode: 'production',
    entry: path.join(__dirname, 'src/main/index.ts'),
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'build')
    },
    node: {
      __dirname: false,
      __filename: false
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version,
        MAJOR: major,
        MINOR: minor,
        PATCH: patch,
        PACKAGE_MAJOR: packageMajor,
        PACKAGE_MINOR: packageMinor,
        PACKAGE_PATCH: packagePatch,
        COMPAT_MIN_MAJOR: compatMinMajor,
        COMPAT_MIN_MINOR: compatMinMinor
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    externals: {
      winprocess: 'require(require("path").resolve(__dirname, "winprocess"))',
    },
    resolve: {
      extensions: [ '.ts', '.js', '.json' ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
]
