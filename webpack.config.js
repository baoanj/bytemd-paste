const path = require('path')

const commonConfig = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: ['es2015', 'chrome58', 'firefox57', 'safari11']
        }
      }
    ]
  }
}

module.exports = [
  {
    ...commonConfig,
    output: {
      filename: 'index.umd.js',
      path: path.resolve(__dirname, 'dist'),
      asyncChunks: false,
      library: {
        name: 'BytemdPaste',
        type: 'umd',
        export: 'default'
      }
    }
  },
  {
    ...commonConfig,
    output: {
      filename: 'index.esm.js',
      path: path.resolve(__dirname, 'dist'),
      asyncChunks: false,
      library: {
        type: 'module'
      }
    },
    experiments: {
      outputModule: true
    }
  }
]
