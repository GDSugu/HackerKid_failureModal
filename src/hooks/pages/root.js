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

const useGetSession = (sessionAttr = []) => {
  const [session, setSession] = useState({});

  useEffect(() => {
    if (sessionAttr.length) {
      const sesn = {};
      sessionAttr.forEach((attr) => {
        sesn[attr] = localStorage.getItem(attr);
      });
      setSession(sesn);
    } else {
      const namePr = getSession('name');
      const rankPr = getSession('rank');
      const pointsEarnedPr = getSession('pointsEarned');
      const profileImagePr = getSession('profileLink');
      Promise.all([
        namePr,
        rankPr,
        pointsEarnedPr,
        profileImagePr,
      ])
        .then(([name, rank, pointsEarned, profileImage]) => {
          setSession({
            name,
            rank,
            pointsEarned,
            profileImage,
          });
        })
        .catch(console.error);
    }
  }, []);

  return {
    session,
    setSession,
  };
};

const AuthContext = React.createContext({});

export default useRootPageState;
export { AuthContext, useGetSession };
