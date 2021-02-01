const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/react-autocomplete-email.js',
  output: {
    path: path.resolve('dist'),
    filename: 'react-autocomplete-email.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  externals: {
    react: {          
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  resolve: {
    extensions: ['.js'],
  },
};
