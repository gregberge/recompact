import path from 'path'

export default {
  entry: path.resolve('./src/recompact.js'),
  output: {
    path: path.resolve('./lib'),
    filename: 'recompact.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              ['transform-class-properties', { loose: true }],
              'transform-object-rest-spread',
            ],
            presets: [
              ['env', { loose: true, modules: false }],
              'react',
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
}
