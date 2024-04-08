const path = require("path");
// import * as path from "path";
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./main.js"),
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "main.js",
  },
  // module: {
  //   rules: [
  //     {
  //       test: /.js$/,
  //       exclude: /node_modules/,
  //       use: "babel-loader",
  //     },
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //     },
  //   ],
  // },
};
