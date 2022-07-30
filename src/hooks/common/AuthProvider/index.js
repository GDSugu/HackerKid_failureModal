import React from 'react';
import { AuthContext, useGetSession } from '../../pages/root';
import { mergeRecursive } from '../framework';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    appData: {},
    sessionData: {},
  });

  const setAuth = (arg) => {
    // const newObj = $.extend(true, {}, authState, arg);
    const newObj = mergeRecursive(authState, arg);
    setAuthState((prevState) => ({
      ...prevState,
      ...newObj,
    }));
  };

  const clearAuthState = () => {
    setAuthState({
      isLoggedIn: false,
      appData: {},
      sessionData: {},
    });
  };

  const isPageMounted = React.useRef(true);

  const { session } = useGetSession({ isPageMounted });

  React.useEffect(() => {
    if (session.authtoken) {
      setAuth({
        isLoggedIn: true,
        sessionData: session,
      });
    }
  }, [session]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: authState.isLoggedIn,
          appData: authState.appData,
          sessionData: authState.sessionData,
          setAuthState: setAuth,
          clearAuthState,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
