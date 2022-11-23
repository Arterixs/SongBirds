const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const esLintPlugin = isDev => isDev ? [] : [new ESLintPlugin({ extensions: 'js' })]

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: ["@babel/polyfill","./script.js"],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@js': path.resolve(__dirname, 'src/js')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        static: './dist',
        hot: false,
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "index.html",
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new MiniCssExtractPlugin ({
            filename: filename('css')
        }),
        ...esLintPlugin(isDev)
    ],
    module: {
      rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "resolve-url-loader",
                {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true,
                  }
                }
            ],
        },
        {
            test: /\.ico$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/images/ico/[name][ext]'
            }
        },
        {
            test: /\.svg$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/images/svg/[name][ext]'
            }
        },
        {
            test: /\.png$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/images/png/[name][ext]'
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/fonts/[hash][ext]'
            }

        },
        {
            test: /\.(gif|mp3)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/mp3/[name][ext]'
            }
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            }
        },
      ],
    },
}