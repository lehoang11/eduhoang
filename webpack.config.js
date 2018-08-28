const env = process.env.MY_ENV === 'production' ? "production" : "development"
const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = {
  //Source to transforms
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/[name].js"
  },
  devServer: {
    // contentBase: "./dist",
    port: 3030
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env'],
            plugins: ['transform-class-properties', 'babel-plugin-transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      // {
      //   test: /.*\.(gif|png|jpe?g|svg)$/i,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       // limit: 8000, // Convert images < 8kb to base64 strings
      //       name: 'images/[hash]-[name].[ext]'
      //     }
      //   }]
      // }
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./templates/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env.MY_ENV': JSON.stringify(env)
    }),

  ]
};
console.log("Your ENV: ", env)
if (env != "production") {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8080, generateStatsFile: true, openAnalyzer:false }))
} else {
  config.plugins.push(new UglifyJsPlugin({sourceMap: false}))
}
module.exports = config