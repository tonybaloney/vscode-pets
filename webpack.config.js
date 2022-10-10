//webpack.config.js
const path = require('path');
var removeSourceMapUrlWebpackPlugin = require('@rbarilani/remove-source-map-url-webpack-plugin');

const loaders = [];

loaders.push({
  test: /\.ts$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'ts-loader',
          options: {
            configFile : 'tsconfig.panel.json'
          }
      },
  ],
});

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/panel/main.ts",
  },
  output: {
    path: path.resolve(__dirname, './media'),
    filename: "[name]-bundle.js", // <--- Will be compiled to this single file
    library: {
      name: 'petApp',
      type: 'global'
    }
  },
  plugins: [
    new removeSourceMapUrlWebpackPlugin({
      test: /main-bundle\.js$/
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: loaders
  },
};