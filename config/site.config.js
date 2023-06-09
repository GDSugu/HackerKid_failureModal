const path = require('path');
const fs = require('fs');

let ROOT = process.env.PWD;

if (!ROOT) {
  ROOT = process.cwd();
}

const config = {
  // Your website's name, used for favicon meta tags
  site_name: 'HackerKid',

  // Your website's description, used for favicon meta tags
  site_description: 'Learning By Doing',

  // Your website's URL, used for sitemap
  site_url: 'https://www.hackerkid.org',

  // Google Analytics tracking ID (leave blank to disable)
  googleAnalyticsUA: 'UA-179096758-1',

  // Facebook pixel code
  facebookPixelId: '846327412836738',

  //hotjar site id
  hotjarSiteId: '2032727',

  //tag manager - everything inside dont use above
  tagManagerId: 'GTM-5Q7MGLH',

  // The viewport meta tag added to your HTML page's <head> tag
  viewport: 'width=device-width,initial-scale=1',

  // Source file for favicon generation. 512x512px recommended.
  favicon: path.join(ROOT, '/src/images/common/favicon.png'),

  // Local development URL
  dev_host: 'localhost',

  // Local development port
  port: process.env.PORT || 8000,

  // Advanced configuration, edit with caution!
  env: process.env.NODE_ENV,
  root: ROOT,
  paths: {
    config: 'config',
    src: 'src',
    dist: 'dist',
  },
  package: JSON.parse(
    fs.readFileSync(path.join(ROOT, '/package.json'), { encoding: 'utf-8' }),
  ),
};

module.exports = config;
