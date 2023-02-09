import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from '../common/pages/App';
import useRootPageState from '../../../hooks/pages/root';
import '../../stylesheets/index/style.scss';
import AuthProvider from '../../../hooks/common/AuthProvider';
import SubscriptionProvider from '../../../hooks/common/SubscriptionProvider';

const AppWrapper = () => {
  const { state } = useRootPageState();

  return (
    <React.StrictMode>
      <SubscriptionProvider>
      <AuthProvider>
      {state.currentLocaleMessages
        ? <IntlProvider
            locale = {state.currentLocale}
            defaultLocale = 'en'
            messages = {state.currentLocaleMessages}
        >
          <App/>
        </IntlProvider>
        : <div>Loading....</div>}
      </AuthProvider>
      </SubscriptionProvider>
    </React.StrictMode>
  );
};

render(
  <AppWrapper/>,
  document.getElementById('root'),
);
