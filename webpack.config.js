const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => [
    isProd ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: (resourcePath, context) => {
          return path.relative(path.dirname(resourcePath), context) + '/';
        },
      },
    } : 'style-loader',
    'css-loader',
  ];

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Beers App',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        hash: true,
      }),
    ];

    if (isProd) {
      plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/main-[hash:8].css',
        }),
      );
    }

    if (isDev) {
      plugins.push(new webpack.SourceMapDevToolPlugin({}));
    }

    return plugins;
  };

  const config = {
    mode: isProd ? 'production' : isDev && 'development',

    output: {
      filename: isProd ? 'js/main-[hash:8].js' : undefined,
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },

        // Loading CSS
        {
          test: /\.css$/i,
          use: getStyleLoaders(),
        },

        // Loading SASS/SCSS
        {
          test: /\.s[ca]ss$/i,
          use: [...getStyleLoaders(), 'sass-loader'],
        },

        // Loading images
        {
          test: /\.(svg|png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                outputPath: 'images',
                limit: 8192,
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },

        // Loading sounds
        {
          test: /\.(mp3)$/,
          loader: 'file-loader',
        },

        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      hot: true,
      historyApiFallback: true,
      progress: true,
      open: 'chrome',
    },
  };

  // Optimization
  if (isProd) {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
        }),
      ],
    };
  }

  return config;
};
