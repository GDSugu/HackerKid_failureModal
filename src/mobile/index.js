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

import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { IntlProvider } from 'react-intl';
import SplashScreen from 'react-native-splash-screen';
import CodePush from 'react-native-code-push';
import App from './pages/App';
import useRootPageState from '../hooks/pages/root';
import ThemeContext from './components/theme';
import { themes, font } from './components/config';
import AuthProvider from '../hooks/common/AuthProvider';
import SubscriptionProvider from '../hooks/common/SubscriptionProvider';
import { getCodePushKey } from './common/framework';

const AppWrapper = () => {
  const { state, setState } = useRootPageState();

  const toggleTheme = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentTheme: prevState.currentTheme === 'dark' ? 'light' : 'dark',
    }));
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SubscriptionProvider>
      <AuthProvider>
        {state.currentLocaleMessages
          ? <ThemeContext.Provider
            value={{
              currentTheme: state.currentTheme,
              theme: themes[state.currentTheme],
              font,
              toggleTheme,
            }}>
            <IntlProvider
              locale={state.currentLocale}
              defaultLocale='en'
              messages={state.currentLocaleMessages}
            >
              <App />
            </IntlProvider>
          </ThemeContext.Provider>
          : <View><Text>Loading....</Text></View>}
      </AuthProvider>
    </SubscriptionProvider>
  );
};

const codePushOptions = {
  deploymentKey: getCodePushKey(),
};

export default CodePush(codePushOptions)(AppWrapper);
