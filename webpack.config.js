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

if (process.env.DISABLE_TRANSLATIONS !== 'true') {
  // This is so we can get builds from PR-check and test it.
  loaders.push({
      // vscode-nls-dev loader:
      // * rewrite nls-calls
      loader: 'vscode-nls-dev/lib/webpack-loader',
      options: {
          // start with this being set to where your package.json is
          base: __dirname,
      },
  });
}

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