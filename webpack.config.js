const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//打包分析使用
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 能夠通過壓縮算法，將前端打包好的資源文件進一步壓縮 gip
const CompressionPlugin = require("compression-webpack-plugin");
//在webpack5中移除了nodejs內核的polyfill自動導入，所以需要手動導入
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isDevEnv = process.env.NODE_ENV === "development";
const path = require("path");
const timestamp = Date.parse(new Date());
console.log(process.env.NODE_ENV);

const chunkSettings = {
  chunks: "initial",
  minSize: 30000,
  minChunks: 1,
  enforce: true,
  maxAsyncRequests: 5, // 最大同步請求請求數， 默認1
  maxInitialRequests: 3, // 最大初始化請求書，默認1
  reuseExistingChunk: true, // 可設置是否重用該chunk
};

module.exports = {
  entry: ["react-hot-loader/patch", "babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: `build-[contenthash].js`,
    clean: true,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"] },
      // { //有使用ts再啟動
      //   test: /\.(ts|tsx)?$/,
      //   use: ["babel-loader", "ts-loader"],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css/,
        use: [
          "css-hot-loader",
          isDevEnv ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDevEnv }, //開發環境需要可以看css的內容
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 8192, fallback: require.resolve("file-loader") },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Public: path.resolve(__dirname, "public/"), //修改url
    },
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   minChunks: 6,
    // }),
    new NodePolyfillPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      //copy html
      template: `${__dirname}/src/index.html`,
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: `${timestamp}.css`,
      chunkFilename: "[id].css",
    }),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
  ],

  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      minSize: 20000,
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          ...chunkSettings,
          test: /react|ckeditor/, // 驗證規則 符合就
          name: "vendor", // 要緩存的 分隔出來的 chunk 名稱
        },
      },
    },
  },
  // cache: {
  //   type: "filesystem", // 記錄打包過的內容，通過檔案快取的方式儲存到本地磁碟
  // },
  devServer: {
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 8277,
    open: true,
    // host: "0.0.0.0", //允許外部連線

    compress: true,
  },
};
