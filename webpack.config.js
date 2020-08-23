//output pathに指定するパスがOSによって異なることを防ぐためにpathモジュールを読み込む
const path = require("path");
//ワイルドカードでファイルを探してきてもらう
const globule = require("globule");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const app = {
  //modeの指定
  mode: "development",
  //エントリーポイントの設定
  entry: "./src/js/app.js",
  //出力の設定
  output: {
    //出力するファイル名
    filename: "main.js",
    // 出力先のパス絶対パスを指定
    path: path.resolve(__dirname, "dist/"),
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
              root: path.resolve(__dirname, "src/pug"),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { url: false },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
  ],
};

const pugfiles = globule.find("./src/pug/**/*.pug", {
  ignore: ["./src/pug/**/_*/*.pug"],
});

pugfiles.forEach((pugfile) => {
  const fileName = pugfile.replace("./src/pug/", "").replace(".pug", ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: pugfile,
    })
  );
});

module.exports = app;
