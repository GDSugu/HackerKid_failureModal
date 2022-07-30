import React, { useState, useEffect } from 'react';
import { getSession } from '../common/framework';
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
    loadLocaleData(currentLocale)
      .then((currentLocaleMessages) => {
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

const useGetSession = ({ sessionAttr = [], isPageMounted }) => {
  const [session, setSession] = useState({});

  useEffect(() => {
    if (sessionAttr.length) {
      const sesn = {};
      sessionAttr.forEach((attr) => {
        sesn[attr] = getSession(attr);
      });
      Promise.all(Object.values(sesn))
        .then((res) => {
          if (isPageMounted.current) {
            Object.entries(sesn).forEach(([key], idx) => {
              sesn[key] = res[idx];
            });
            setSession(sesn);
          }
        });
    } else {
      const authPr = getSession('authtoken');
      const namePr = getSession('name');
      const rankPr = getSession('rank');
      const pointsEarnedPr = getSession('pointsEarned');
      const profileImagePr = getSession('profileLink');
      Promise.all([
        authPr,
        namePr,
        rankPr,
        pointsEarnedPr,
        profileImagePr,
      ])
        .then(([authtoken, name, rank, pointsEarned, profileImage]) => {
          if (isPageMounted.current) {
            setSession({
              authtoken,
              name,
              rank,
              pointsEarned,
              profileImage,
            });
          }
        })
        .catch(console.error);
    }
  }, []);

  return {
    session,
    setSession,
  };
};

const AuthContext = React.createContext();

export default useRootPageState;
export { AuthContext, useGetSession };
