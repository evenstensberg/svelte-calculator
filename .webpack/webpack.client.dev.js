const { join, dirname } = require("path");
const webpack = require("webpack");
const SveltePreprocess = require("svelte-preprocess");
const Autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = true;

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts",
  },
  mode: "development",
  output: {
    path: join(__dirname, "..", "public"),
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              // Dev mode must be enabled for HMR to work!
              dev: true,
            },
            emitCss: false, // prod = true,
            hotReload: true,
            hotOptions: {
              // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
              noPreserveState: false,
              optimistic: true,
            },
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
              postcss: {
                plugins: [Autoprefixer],
              },
            }),
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[fullhash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$|sass$|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              limit: 10 * 1024,
              noquotes: true,
            },
          },
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images/",
              emitFile: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: join(__dirname, "..", "index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.[fullhash].css",
      chunkFilename: "chunks/[id].chunk.[fullhash].css",
    }),
  ],
  stats: {
    children: true,
    errorDetails: true,
  },
  resolve: {
    alias: {
      svelte: dirname(require.resolve("svelte/package.json")),
    },
    extensions: [".mjs", ".js", ".svelte", ".tsx", ".ts"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
};
