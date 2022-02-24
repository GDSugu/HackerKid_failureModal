import 'intl';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/add-all-tz';

import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { IntlProvider } from 'react-intl';
import App from './pages/App';
import useRootPageState from '../hooks/pages/root';
import ThemeContext from './components/theme';
import { themes, font } from './components/config';

const AppWrapper = () => {
  const { state, setState } = useRootPageState();

  const toggleTheme = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentTheme: prevState.currentTheme === 'dark' ? 'light' : 'dark',
    }));
  });

  return (
    state.currentLocaleMessages
      ? <ThemeContext.Provider
          value = {{
            currentTheme: state.currentTheme,
            theme: themes[state.currentTheme],
            font,
            toggleTheme,
          }}>
          <IntlProvider
            locale = {state.currentLocale}
            defaultLocale = 'en'
            messages = {state.currentLocaleMessages}
          >
            <App/>
          </IntlProvider>
        </ThemeContext.Provider>
      : <View><Text>Loading....</Text></View>
  );
};

export default AppWrapper;
