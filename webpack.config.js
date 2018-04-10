const webpack = require('webpack');

module.exports = [
  {
    entry: {
      script: './src/app.ts'
    },
    output: {
      path: __dirname + '/js',
      filename: '[name].js'
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
      contentBase: '',
      inline: true,
      hot: true,
      port: 3000
    },

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.js']
    },

    module: {
      loaders: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.ts?$/, loader: 'ts-loader' }
      ]
    }
  }
];
