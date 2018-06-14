module.exports = {
  mode: "production",
  entry: __dirname + "/src/app.ts",
  output: {
    path: __dirname + "/public",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          { loader: "ts-loader" }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [],
  performance: {
    hints: false
  },
  devServer: {
    contentBase: __dirname + "/public",
    hot: true,
    open: true
  }
};
