import getPlatform from './utlis';

const getLocale = () => {
  const platform = getPlatform();
  if (platform === 'web') {
    const { language } = window.navigator;
    if (language) {
      return language.slice(0, 2);
    }
  }
  return 'en';
};

const loadLocaleData = (locale) => {
  switch (locale) {
    case 'fr':
      return import('../../compiled-locales/fr.json');
    default:
      return import('../../compiled-locales/en.json');
  }
};

export {
  getLocale,
  loadLocaleData,
};
