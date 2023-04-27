const path=require('path');
const constants=require('constants')
module.exports = {
    entry: "./src/index.ts",
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    mode: "production",
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        library: "svz-accordion",
        globalObject: 'this'
    },
    devtool: "source-map",
    module: {
      rules: [
        { test: /\.ts?$/, loader: "babel-loader" },
        { test: /\.ts?$/, loader: "ts-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    externals: {
      "react": {
        "commonjs": "react",
        "commonjs2": "react",
        "amd": "react",
        "root": "React"
      },
      "react-dom": {
          "commonjs": "react-dom",
          "commonjs2": "react-dom",
          "amd": "react-dom",
          "root": "ReactDOM"
      }
    }
  };