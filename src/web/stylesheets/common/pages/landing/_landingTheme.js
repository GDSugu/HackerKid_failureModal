const {
  Yellow, LightBlue, utilColors, Red, Purple,
} = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'home-body-bg': lightTheme.screenYellow.bodyBg,
  'landing-header-bg': '#212527',
  'landing-yellow-color': '#FF9B03',
  'landing-yellow-light-color': '#FFBC04',
  'landing-black-color': '#000000',
  'landing-text-color': '#505659',
  'landing-green-color': '#178958',
  'landing-faq-head-color': '#178958',
  'landing-border-color': '#A9ABAC',
  'landing-white-color': '#ffffff',
  'landing-yellow-light-color': '#FFEAB2',
  'landing-blue-light-color': '#DFF8FE',
  'landing-blue-color': '#00BAFF',
  'landing-grey-light-color': '#EFEFEF',
  'landing-red-light-color': '#FF5A79',

};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'home-body-bg': darkTheme.screenYellow.bodyBg,
  'landing-header-bg': '#212527',
  'landing-yellow-color': '#FF9B03',
  'landing-black-color': '#000000',
  'landing-text-color': '#505659',
  'landing-green-color': '#178958',
  'landing-faq-head-color': '#178958',
  'landing-yellow-light-color': '#FFBC04',
  'landing-border-color': '#A9ABAC',
  'landing-white-color': '#ffffff',
  'landing-yellow-light-color': '#FFEAB2',
  'landing-blue-light-color': '#DFF8FE',
  'landing-blue-color': '#00BAFF',
  'landing-grey-light-color': '#EFEFEF',
  'landing-red-light-color': '#FF5A79',
};

const cssvars = {
  'home-body-bg': '--home-body-bg',
  'landing-header-bg': '--landing-header-bg',
  'landing-yellow-color': '--landing-yellow-color',
  'landing-black-color': '--landing-black-color',
  'landing-text-color': '--landing-text-color',
  'landing-green-color': '--landing-green-color',
  'landing-faq-head-color': '--landing-faq-head-color',
  'landing-yellow-light-color': '--landing-yellow-light-color',
  'landing-border-color': '--landing-border-color',
  'landing-white-color': '--landing-white-color',
  'landing-yellow-light-color': '--landing-yellow-light-color',
  'landing-blue-light-color': '--landing-blue-light-color',
  'landing-blue-color': '--landing-blue-color',
  'landing-grey-light-color': '--landing-grey-light-color',
  'landing-red-light-color': '--landing-red-light-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
