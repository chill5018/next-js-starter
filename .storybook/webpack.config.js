const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');


module.exports = function(storybookBaseConfig, configType) {
  const isProduction = configType === 'PRODUCTION';

  const ourConfig = {
    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
          include: [path.resolve(__dirname), 'node_modules' ]
        },
        {
          test: /\.svg$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'react-svg-loader',
              options: {
                es5: true
              }
            }
          ]
        },
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)$/,
          include: path.resolve (__dirname, '../')
        },
        {
          test: /\.s(a|c)ss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        STORYBOOK: JSON.stringify(true),
        PRODUCTION: JSON.stringify(isProduction)
      })
    ]
  };

  const ourProdSpecificConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
          include: path.resolve(__dirname)
        }
      ]
    }
  };

  const baseConfig = merge(storybookBaseConfig, ourConfig);
  return isProduction ? merge(baseConfig, ourProdSpecificConfig) : baseConfig;
};