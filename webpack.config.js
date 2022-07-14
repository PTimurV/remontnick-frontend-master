const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SpriteLoader = require('svg-sprite-loader/plugin.js')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const hbsData = require('./hbsData.js')

const { NODE_ENV, HOST, PORT, TEST_BUILD } = process.env
const isDev = NODE_ENV === 'development'
const isTestProdBuild = !!TEST_BUILD
const mode = isDev ? 'development' : 'production'
const host = HOST || 'localhost'
const port = PORT || 8080

const paths = {
  src: path.resolve(__dirname, 'src'),
  html: path.resolve(__dirname, 'src', 'assets', 'html'),
  assets: path.resolve(__dirname, 'src', 'assets'),
  build: path.resolve(__dirname, 'build'),
}

const entry = {
  main: path.resolve(paths.src, 'index.ts'),
  classes: path.resolve(paths.src, 'classes', 'index.ts'),
  utils: path.resolve(paths.src, 'utils', 'index.ts'),
}

const chunks = Object.keys(entry)

glob
  .sync('**/*.ts', {
    cwd: path.resolve(paths.src, 'pages'),
  })
  .forEach((file) => {
    const chunkName = file.split('.')[0]

    entry[chunkName] = path.resolve(paths.src, 'pages', file)
  })

const devServer = {
  static: path.join(__dirname, 'public'),
  host,
  port,
  historyApiFallback: true,
  hot: true,
  compress: true,
  https: false,
}

const config = {
  entry,
  output: {
    filename: '[name].bundle.js',
    path: paths.build,
    // publicPath: '/',
    clean: true,
  },
  devtool: isDev ? 'inline-source-map' : 'eval',
  target: isDev ? 'web' : 'browserslist',
  stats: {
    children: true,
  },
  mode,
  devServer,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              cache: true,
              extract: true,
              spriteFilename: 'sprite.svg?v=[contenthash]',
              esModule: false,
              publicPath: '/',
              runtimeGenerator: require.resolve(
                path.resolve(paths.src, 'plugins', 'svg-generator.js')
              ),
            },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.(mp4|ogg|webm)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name][ext][query]',
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [path.resolve(paths.html, 'helpers')],
          partialDirs: [path.resolve(paths.html, 'includes')],
          inlineRequires: '@/assets',
          sources: ['srcset'],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new SpriteLoader({ plainSprite: true }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), noErrorOnMissing: true },
      ],
    }),
    ...glob
      .sync('**/*.hbs', {
        cwd: path.resolve(paths.html, 'views'),
        nodir: true,
      })
      .map(
        (file) =>
          new HtmlWebpackPlugin({
            filename: file.replace('.hbs', '.html'),
            template: path.resolve(paths.html, 'views', file),
            chunks: [file.split('.')[0], ...chunks],
            data: hbsData,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
            },
          })
      ),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': paths.src,
    },
    cache: true,
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    sideEffects: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
        },
      }),
    ],
    emitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )

            return packageName
              ? `vendor.${packageName[1].replace('@', '')}`
              : ''
          },
        },
      },
    },
  },
}

if (isTestProdBuild) {
  config.plugins?.push(
    new BundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    })
  )
}

module.exports = config
