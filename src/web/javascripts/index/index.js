import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from '../common/pages/App';
import useRootPageState from '../../../hooks/pages/root';

const AppWrapper = () => {
  const { state } = useRootPageState();

  return (
    state.currentLocaleMessages
      ? <IntlProvider
          locale = {state.currentLocale}
          defaultLocale = 'en'
          messages = {state.currentLocaleMessages}
      >
        <App/>
      </IntlProvider>
      : <div>Loading....</div>
  );
};

render(
  <AppWrapper/>,
  document.getElementById('root'),
);
