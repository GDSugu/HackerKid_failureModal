const getLocale = () => {
  const { language } = window.navigator.language;
  if (language) {
    return language.slice(0, 2);
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
