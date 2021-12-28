const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: commonConfig.plugins.concat([
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ]),
});
