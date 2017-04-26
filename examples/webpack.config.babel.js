import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: path.resolve('./examples/main.js'),
  output: {
    path: path.resolve('./examples/dist'),
    filename: 'main.js',
  },
  plugins: [new HtmlWebpackPlugin()],
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
              ['latest', { es2015: { loose: true, modules: false } }],
              'react',
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
}
