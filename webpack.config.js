const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BASE_JS = "./src/client/js/";
/* entry, output : 변형할 파일 경로, 변형한 파일 저장 경로
    modules : 파일 변형 규칙
    아래 코드의 경우 js 파일을 babel적용
*/
module.exports = {
  mode: "development",
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  //front node 종료가 되지 않도록 nodemon과 같은 역할
  watch: true,

  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "js/[name].js",
    //webpack 재실행 시 output folder clean
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //should start with last loader
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
