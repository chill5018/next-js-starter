const path = require('path')
const glob = require('glob')
const withImages = require('next-images')

module.exports = withImages({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    cssModules: true,
    config.output.publicPath = `/${config.output.publicPath}`,
    config.module.rules.push({
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: require.resolve('file-loader')
    },
    {
      test: /\.(css|scss)/,
      loader: 'emit-file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }
    ,
    {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader']
    }
    ,
    {
      test: /\.s(a|c)ss$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader',
        { loader: 'sass-loader',
          options: {
            includePaths: ['styles', 'node_modules']
              .map((d) => path.join(__dirname, d))
              .map((g) => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }
        }
      ]
    }
  )

    return config
  }
})
