const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./site.config');
const path = require('path');
const fs = require('fs');
const jsonImporter = require('node-sass-json-importer');
// Define common loader constants
const sourceMap = config.env !== 'production';

const INCLUDE_PATTERN = /\<include src=\"(.+)\"\/?\>(?:\<\/include\>)?/gi;
const processNestedHtml = (content, loaderContext) => !INCLUDE_PATTERN.test(content) ?
  content : content.replace(INCLUDE_PATTERN, (m, src) => processNestedHtml(fs.readFileSync(path.resolve(loaderContext.context, src), 'utf8'), loaderContext));

// HTML loaders
const html = {
  test: /\.(html)$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        preprocessor: processNestedHtml,
      },
    },
  ],
};

// Javascript loaders
const js = {
  test: /\.js(x)?$/,
  exclude: [
    /node_modules/,
    path.join(config.root, config.paths.src, 'web', 'javascripts/vendors/'),
  ],
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
      },
    },
  ],
};

// Style loaders
const styleLoader = {
  loader: 'style-loader'
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap,
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')(),
    ],
    sourceMap,
  },
};

const css = {
  test: /\.css$/,
  use: [
    config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
  ],
};

const sass = {
  test: /\.s[c|a]ss$/,
  use: [
    config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: 'sass-loader',
      options: {
        sourceMap,
        sassOptions: {
          importer: jsonImporter(),
        },
      },
    },
  ],
};

const less = {
  test: /\.less$/,
  use: [
    config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: 'less-loader',
      options: {
        sourceMap,
      },
    },
  ],
};

// Image loaders
const imageLoader = {
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      quality: [0.65, 0.90],
      speed: 4,
    },
    mozjpeg: {
      progressive: true,
    },
  },
};

const images = {
  test: /\.(gif|png|jpe?g|svg|webp)$/i,
  exclude: /fonts/,
  use: [
    'file-loader?name=images/[name].[hash].[ext]',
    config.env === 'production' ? imageLoader : null,
  ].filter(Boolean),
};

// Font loaders
const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
  exclude: /images/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[hash].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

// Video loaders
const videos = {
  test: /\.(mp4|webm)$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[hash].[ext]',
        outputPath: 'images/',
      },
    },
  ],
};

const es5loaderSkulpt = {
  test: require.resolve('../src/web/javascripts/vendors/skulpt/skulpt.min.js'),
  loader: 'exports-loader',
  options: {
    exports: 'default Sk',
  },
};

module.exports = [
  html,
  js,
  css,
  sass,
  less,
  images,
  fonts,
  videos,
  es5loaderSkulpt,
];
