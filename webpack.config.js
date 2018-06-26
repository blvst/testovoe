import HappyPack from 'happypack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: {
    scripts: './app/js/app.js',
  },
  output: {
    path: `${__dirname}/build/assets/`,
    filename: 'bundle.js',
  },
  watch: process.env.NODE_ENV !== 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        query: {
          configFile: '.eslintrc',
          emitErrors: false,
          emitWarning: true,
        },
      },
      {
        test: /.js$/,
        use: 'happypack/loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules/,
        ],
      },
    ],
  },

  resolve: {
    alias: {
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
    },
  },

  plugins: [
    new HappyPack({
      loaders: ['babel-loader?presets[]=env'],
      threads: 4,
      verbose: false,
    }),
  ],

  optimization: process.env.NODE_ENV === 'production' ? {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 8,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  } : {},
};
