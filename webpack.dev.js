const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getCompatMin = require('./compat-list')

const [ major, minor, patch ] = process.env.npm_package_compatVersion.split('.')
const [ packageMajor, packageMinor, packagePatch ] = process.env.npm_package_version.split('.')
const [ compatMinMajor, compatMinMinor ] = getCompatMin(process.env.npm_package_version)

const extractSass =
  new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
  })

module.exports = [
  {
    target: 'electron-renderer',
    entry: {
      renderer: path.join(__dirname, 'src/renderer/index.tsx')
    },
    output: {
      filename: 'renderer.js',
      path: path.join(__dirname, 'build')
    },
    devtool: 'source-map',
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
      new CheckerPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      extractSass
    ],
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
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
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
              {
                loader: 'sass-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: (loader) => [
                    require('autoprefixer')()
                  ]
                }
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    }
  },
  {
    target: 'electron',
    entry: path.join(__dirname, 'src/main/index.ts'),
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
        VERSION: process.env.npm_package_version.slice(-2) === '.0' ? process.env.npm_package_version.slice(0, process.env.npm_package_version.length - 2) : process.env.npm_package_version,
        MAJOR: major,
        MINOR: minor,
        PATCH: patch,
        PACKAGE_MAJOR: packageMajor,
        PACKAGE_MINOR: packageMinor,
        PACKAGE_PATCH: packagePatch,
        COMPAT_MIN_MAJOR: compatMinMajor,
        COMPAT_MIN_MINOR: compatMinMinor
      })
    ],
    externals: {
      winprocess: 'require(require("path").resolve(__dirname, "winprocess"))',
      'process-list': 'require(require("path").resolve(__dirname, process.platform === "win32" ? "processlist" : "processlist-linux))'
    },
    resolve: {
      extensions: [ '.ts', '.js', '.json' ]
    },
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
