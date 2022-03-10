const webpack = require('webpack');
const cssnano = require('cssnano');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const commonFunctions = require('./commonFunctions');

const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const Dotenv = require('dotenv-webpack');
const CreateFileWebpack = require('create-file-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = require('./site.config');

const eslintOptions = {
  extensions: ['js', 'jsx'],
  exclude: [
    '/node_modules/',
    path.join(config.root, config.paths.src, 'web', 'javascripts/vendors/'),
  ],
};

const esLint = new ESLintPlugin(eslintOptions);

// Hot module replacement
const hmr = new webpack.HotModuleReplacementPlugin();

// Optimize CSS assets
const optimizeCss = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: cssnano,
  cssProcessorPluginOptions: {
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  },
  canPrint: true,
});

// Generate robots.txt
const robots = new RobotstxtPlugin({
  sitemap: `${config.site_url}/sitemap.xml`,
  host: config.site_url,
});

// Clean webpack
const clean = new CleanWebpackPlugin();

// Stylelint
const stylelint = new StyleLintPlugin({
  files: [
    '**/*.css',
    '**/*.scss',
  ]
});

// Extract CSS
const cssExtract = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[name].[contenthash].css'
});

// HTML generation
let paths = [];
const ignoredPaths = [
  "clubs.html",
  "eventDay.html",
  "profile.html",
  "profile-edit.html",
  "turtle-createChallenge.html",
  "turtle-share.html",
  "turtle-shareChallenge.html",
  "certificate-snap.html",
  "certificate-snap-view.html",
  "index-deprecated-v1.html",
  "turtle-takeChallenge.html",
];
const generateHTMLPlugins = () => {
  const htmlFilePaths = commonFunctions.list('./src/web/*.html');
  return htmlFilePaths.map((filePath) => {
    let filename = filePath.substring(10);
    if (!ignoredPaths.includes(filename)) {
      paths.push(filename);
    }
    return new HTMLWebpackPlugin({
      filename,
      template: path.join(config.root, config.paths.src, 'web', filename),
      meta: {
        viewport: config.viewport,
      },
      minify: true,
      chunks: [filename.slice(0, -5)]
    });
  });
};

// Beautify HTML
const beautify = new HtmlBeautifyPlugin();

// Sitemap
const sitemap = new SitemapPlugin(config.site_url, paths, {
  priority: 1.0,
  lastmodrealtime: true,
});

// Favicons
const favicons = new FaviconsWebpackPlugin({
  logo: config.favicon,
  prefix: 'images/favicons/',
  favicons: {
    appName: config.site_name,
    appDescription: config.site_description,
    developerName: null,
    developerURL: null,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      windows: false,
      yandex: false,
    },
  },
});

// CopyPlugin
// To copy images that are not used through CSS, but directly on HTML as IMG src
const copier = new CopyPlugin({
  patterns: [
    {
      from: '../node_modules/blockly/media',
      to: './blockly/media',
    },
    {
      from: '../src/images/**',
      to: './',
    }
  ],
});

// Webpack bar
const webpackBar = new WebpackBar({
  color: '#ff6469',
});

// Google analytics
const CODE = `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','{{ID}}','auto');ga('send','pageview');</script>`;

class GoogleAnalyticsPlugin {
  constructor({ id }) {
    this.id = id;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('GoogleAnalyticsPlugin', (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'GoogleAnalyticsPlugin',
        (data, cb) => {
          data.html = data.html.replace('</head>', `${CODE.replace('{{ID}}', this.id) }</head>`);
          cb(null, data);
        },
      );
    });
  }
}

const google = new GoogleAnalyticsPlugin({
  id: config.googleAnalyticsUA,
});

// Facebook pixel
const pixelCode = `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '{{ID}}');fbq('track', 'PageView');</script><noscript> <img height="1" width="1"src="https://www.facebook.com/tr?id={{ID}}&ev=PageView&noscript=1"/></noscript>`;

class FacebookPixelPlugin {
  constructor({ id }) {
    this.id = id;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('FacebookPixelPlugin', (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'FacebookPixelPlugin',
        (data, cb) => {
          data.html = data.html.replace('</head>', `${pixelCode.replace(/{{ID}}/g, this.id)}</head>`);
          cb(null, data);
        },
      );
    });
  }
}

const facebook = new FacebookPixelPlugin({
  id: config.facebookPixelId,
});

// hotjar tracking code
const hotjarCode = `<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:{{ID}},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`;

const hotjarApplicablePages = ['block-coding-olympiad.html'];

class hotjarTrackingPlugin {
  constructor({ id }) {
    this.id = id;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('hotjarTrackingPlugin', (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'hotjarTrackingPlugin',
        (data, cb) => {
          if (hotjarApplicablePages.includes(data.outputName)) {
            data.html = data.html.replace('</head>', `${hotjarCode.replace(/{{ID}}/g, this.id)}</head>`);
          }
          cb(null, data);
        },
      );
    });
  }
}

const hotjar = new hotjarTrackingPlugin({
  id: config.hotjarSiteId,
});

// google tag manager(everything in one)
const tagManagerHead = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{ID}}');</script>`;

const tagManagerBody = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ID}}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

class tagManagerPlugin {
  constructor({ id }) {
    this.id = id;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('tagManagerPlugin', (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'tagManagerPlugin',
        (data, cb) => {
          data.html = data.html.replace('</head>', `${tagManagerHead.replace(/{{ID}}/g, this.id)}</head>`);
          data.html = data.html.replace('<body>', `<body>${tagManagerBody.replace(/{{ID}}/g, this.id)}`);
          cb(null, data);
        },
      );
    });
  }
}

const tagManager = new tagManagerPlugin({
  id: config.tagManagerId,
});

const swRegScript = `<script>
try {
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/service-worker.js').then((registration) => {
         console.log('SW registered: ', registration);
       }).catch((registrationError) => {
         console.log('SW registration failed: ', registrationError);
       });
     });
   }
} catch (error) {
  console.log(error);
}
</script>`;

class swInjectPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('swInjectPlugin', (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'swInjectPlugin',
        (data, cb) => {
          data.html = data.html.replace('</head>', `${swRegScript}</head>`);
          cb(null, data);
        },
      );
    });
  }
}

const swInjector = new swInjectPlugin();

const env = new Dotenv({
  // path: path.join(config.root, 'env', process.env.VARIANT, '.env'),
  path: path.join(config.root, `.env.${process.env.VARIANT}`),
});

const htaccess = `<FilesMatch "^\\.ht">
    Require all denied
</FilesMatch>

Options +FollowSymlinks
Options -Indexes

#maintain position
RewriteEngine On

#turtle pages start
RewriteRule ^turtle/challenges/create/(.*) /turtle-createChallenge.html [NC,L]
RewriteRule ^turtle/challenges/submissions/(.*) /turtle-shareChallenge.html [NC,L]

RewriteCond %{HTTP_USER_AGENT} googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\\ link\\ preview|showyoubot|outbrain|pinterest\\/0\\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp [NC]
RewriteRule ^turtle/challenges/(.*) http://localhost:3001/turtle/challenges/$1 [NC,L,P]

RewriteRule ^turtle/challenges/(.*) /turtle-takeChallenge.html [NC,L]

RewriteRule ^turtle/submissions/(.*) /turtle-share.html [NC,L]

RewriteCond %{HTTP_USER_AGENT} googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\\ link\\ preview|showyoubot|outbrain|pinterest\\/0\\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp [NC]
RewriteRule ^turtle/(.*) http://localhost:3001/turtle/$1 [NC,L,P]

RewriteRule ^turtle/(.*) /turtle.html [NC,L]
#turtle pages end

#profile pages start
RewriteRule ^profile/edit/(.*) /profile-edit.html [NC,L]
RewriteRule ^profile/(.*) /profile.html [NC,L]
#profile pages end

#certificate pages start
RewriteRule ^certificate/snap/(.*) /certificate-snap.html [NC,L]
RewriteRule ^certificate/view/(.*) /certificate-snap-view.html [NC,L]
#certificate pages end

#zombieland pages start
RewriteRule ^zombieland/(.*) /zombieland.html [NC,L]
#zombieland pages end

#merchandise pages start
RewriteRule ^merchandise/(.*) /merchandise.html [NC,L]
#merchandise pages end

#webkata pages start
RewriteRule ^webkata/(.*) /webkata.html [NC,L]
#webkata pages end

#dont touch below
#rewrite for index.html
RewriteBase /
RewriteCond %{THE_REQUEST} ^GET\\s(.*/)index\\.html [NC]
RewriteRule . %1 [NE,R=301,L]

#redirect files if comes with .html
RewriteCond %{THE_REQUEST} /([^.]+)\\.html [NC]
RewriteRule ^ /%1 [NC,L,R=301]

#serve files without html but only if the html file exists
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^ %{REQUEST_URI}.html [NC,L]`;

const createHtaccess = new CreateFileWebpack({
  path: './dist',
  fileName: '.htaccess',
  content: htaccess,
});

const bundleAnalyser = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'bundler-report.html',
});

const hashProvider = new webpack.ExtendedAPIPlugin();

const generateSw = new WorkboxPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  exclude: [
    /\.(?:png|jpg|jpeg|svg|webp)$/i,
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/i,
      handler: 'NetworkFirst',
    },
    {
      urlPattern: /api(.*)\/v1\//i,
      handler: 'NetworkFirst',
    },
  ],
});

class setDynamicPathsPlugin {
  apply(compiler) {
    compiler.hooks.run.tapPromise('sitemap', (source, target, routesList) => {
      return commonFunctions.getDynamicLinks().then((links) => {
        paths.push(...links);
        console.log('Dynamic paths are fetched and assigned successfully for sitemap');
      })
    });
  }
}

const setDynamicPaths = new setDynamicPathsPlugin();

module.exports = [
  clean,
  esLint,
  stylelint,
  cssExtract,
  ...generateHTMLPlugins(),
  beautify,
  fs.existsSync(config.favicon) && favicons,
  copier,
  config.env === 'production' && optimizeCss,
  // config.env === 'production' && robots,
  config.env === 'production' && sitemap,
  // config.env === 'production' && config.googleAnalyticsUA && google,
  // config.env === 'production' && config.facebookPixelId && facebook,
  // config.env === 'production' && config.hotjarSiteId && hotjar,
  config.env === 'production' && config.tagManagerId && tagManager,
  webpackBar,
  config.env === 'development' && hmr,
  config.env === 'production' && hashProvider,
  env,
  createHtaccess,
  config.env === 'production' && process.env.VARIANT === 'local' && bundleAnalyser,
  config.env === 'production' && setDynamicPaths,
].filter(Boolean);
