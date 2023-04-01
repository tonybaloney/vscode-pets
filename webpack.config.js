//webpack.config.js
const path = require('path');
const webpack = require('webpack');
var removeSourceMapUrlWebpackPlugin = require('@rbarilani/remove-source-map-url-webpack-plugin');


const desktopConfig = {
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
		fallback: {
			fs: false,
			vscode: false,
			path: false,
			path: require.resolve('path-browserify')
		}
  },
  module: {
    rules: [{
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
    }]
  },
};

const webExtensionConfig = {
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
	target: 'webworker', // extensions run in a webworker context
	entry: {
		extension: './src/extension/extension.ts', // source of the web extension main file
		// 'test/suite/index': './src/web/test/suite/index.ts', // source of the web extension test runner
	},
	output: {
		filename: '[name]-web.js',
		path: path.join(__dirname, './dist/web'),
		libraryTarget: 'commonjs',
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
		extensions: ['.ts', '.js'], // support ts-files and js-files
		alias: {
			// provides alternate implementation for node module and source files
		},
		fallback: {
			// Webpack 5 no longer polyfills Node.js core modules automatically.
			// see https://webpack.js.org/configuration/resolve/#resolvefallback
			// for the list of Node.js core module polyfills.
			"assert": require.resolve('assert'),
      "path": require.resolve("path-browserify"),
      "fs": false,
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
            options: {
              configFile : 'tsconfig.web.json'
            }
					},
				],
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser', // provide a shim for the global `process` variable
		}),
	],
	externals: {
		vscode: 'commonjs vscode', // ignored because it doesn't exist
	},
	performance: {
		hints: false,
	},
	devtool: 'nosources-source-map', // create a source map that points to the original source file
};

module.exports = [desktopConfig, webExtensionConfig];