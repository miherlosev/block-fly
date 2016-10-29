const webpack = require("webpack");
const WebpackConfig = require("webpack-config");

module.exports = new WebpackConfig.Config().extend({
  "./config/webpack.base.config.js": (config) => {
    return config;
  }
}).merge({
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:5555",
      "webpack/hot/only-dev-server"
    ]
  },

  output: {
    filename: "[name].js"
  },

  // more options here: http://webpack.github.io/docs/configuration.html#devtool
  devtool: "eval-source-map",

  watch: true,

  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: "style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox"
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
