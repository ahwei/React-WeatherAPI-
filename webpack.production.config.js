const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");
module.exports = merge(config, {
  mode: "production",
  // output: { 如果build 要在local打開需要這段設定
  //   path: path.resolve(__dirname, "dist"),
  //   publicPath: "./",
  //   filename: `build-[contenthash].js`,
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CopyPlugin({ patterns: [{ from: "public", to: "public" }] }),
  ],
});
