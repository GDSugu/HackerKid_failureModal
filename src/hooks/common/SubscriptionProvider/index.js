import React from 'react';
import { SubscriptionContext, useGetSubscription } from '../../pages/root';

const SubscriptionProvider = ({ children }) => {
  const isPageMounted = React.useRef(true);
  const { subscriptionData, clearSubscriptionData } = useGetSubscription({ isPageMounted });
  return (
    <>
      <SubscriptionContext.Provider
        value= {{
          subscriptionData,
          clearSubscriptionData,
        }}
      >
        {children}
      </SubscriptionContext.Provider>
    </>
  );
};

export default SubscriptionProvider;
