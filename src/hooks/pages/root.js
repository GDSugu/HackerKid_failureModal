import React, { useState, useEffect } from 'react';
import post, { getSession } from '../common/framework';
import {
  getLocale,
  loadLocaleData,
} from '../common/intl';
import getPlatform, { getDevice } from '../common/utlis';

const useRootPageState = () => {
  const [state, setState] = useState({
    currentLocaleMessages: false,
    currentLocale: false,
    currentTheme: 'light',
    platform: 'web',
    device: 'desktop',
  });

  const currentLocale = getLocale();
  const platform = getPlatform();
  const device = getDevice();

  useEffect(() => {
    loadLocaleData(currentLocale)
      .then((currentLocaleMessages) => {
        setState((prevState) => ({
          ...prevState,
          currentLocaleMessages,
          currentLocale,
          platform,
          device,
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
      const uniqueURLPr = getSession('unique_url');
      Promise.all([
        authPr,
        namePr,
        rankPr,
        pointsEarnedPr,
        profileImagePr,
        uniqueURLPr,
      ])
        .then(([authtoken, name, rank, pointsEarned, profileImage, uniqueURL]) => {
          if (isPageMounted.current) {
            setSession({
              authtoken,
              name,
              rank,
              pointsEarned,
              profileImage,
              unique_url: uniqueURL,
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

const useGetSubscription = ({ isPageMounted }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    isFetching: false,
    status: false,
    planFeatures: {},
    planType: 'free',
  });

  const getSubscriptionData = async () => {
    setSubscriptionData((prevState) => ({
      ...prevState,
      isFetching: true,
    }));
    return post({
      type: 'getUserSubscription',
    }, 'subscriptionConfig/')
      .then((res) => {
        if (isPageMounted.current) {
          if (res === 'access_denied') {
            setSubscriptionData((prevState) => ({
              ...prevState,
              isFetching: false,
              status: false,
            }));
          } else {
            const parsedResponse = JSON.parse(res);
            if (parsedResponse.status === 'success') {
              setSubscriptionData((prevState) => ({
                ...prevState,
                isFetching: false,
                status: true,
                planFeatures: parsedResponse.planFeatures,
                planType: parsedResponse.subscriptionType,
              }));
            } else {
              setSubscriptionData((prevState) => ({
                ...prevState,
                isFetching: false,
                status: false,
              }));
            }
          }
        }
      });
  };
  useEffect(() => {
    getSubscriptionData();
  }, []);

  return {
    subscriptionData,
    setSubscriptionData,
  };
};

const AuthContext = React.createContext();
const SubscriptionContext = React.createContext();

export default useRootPageState;
export {
  AuthContext, SubscriptionContext, useGetSession, useGetSubscription,
};
