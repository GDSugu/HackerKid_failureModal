const glob = require('glob');
const del = require('del');
// const axios = require('axios');
const FormData = require('form-data');

const list = (pathPattern, options) => {
  return glob.sync(pathPattern, options);
}

const clean = (paths = [], options = {force: true, dryRun: true}) => {
  const deletedPaths = del.sync(paths, options);
  if (!options.dryRun) {
    console.log(`Cleaned the files ${deletedPaths.join('\n')}`);
  } else {
    console.log(deletedPaths.join('\n'));
  }
};

const getDynamicLinks = () => {
  const bodyFormData = new FormData();
  bodyFormData.append('myData', JSON.stringify({
    type: 'getSiteMap',
  }));
  return fetch('https://api.hackerkid.org/v1/seo/', bodyFormData, {
    headers: bodyFormData.getHeaders(),
  }).then((response) => {
    return response.data;
  }).then((response) => {
    if (response.status === 'success') {
      return response.links;
    }
    return [];
  });
};

module.exports = {
  list,
  clean,
  getDynamicLinks,
};
