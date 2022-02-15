import React, { useState, useEffect } from 'react';
import {
  getLocale,
  loadLocaleData,
} from '../common/intl';

const useRootPageState = () => {
  const [state, setState] = useState({
    currentLocaleMessages: false,
    currentLocale: false,
    currentTheme: 'light',
  });

  const currentLocale = getLocale();

  useEffect(() => {
    loadLocaleData(currentLocale).then((currentLocaleMessages) => {
      setState((prevState) => ({
        ...prevState,
        currentLocaleMessages,
        currentLocale,
      }));
    });
  }, []);

  return {
    state,
    setState,
    static: {},
  };
};

export default useRootPageState;
