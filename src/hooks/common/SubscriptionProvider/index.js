import React from 'react';
import { SubscriptionContext, useGetSubscription } from '../../pages/root';

const SubscriptionProvider = ({ children }) => {
  const isPageMounted = React.useRef(true);
  const { subscriptionData } = useGetSubscription({ isPageMounted });
  return (
    <>
      <SubscriptionContext.Provider
        value= {{
          subscriptionData,
        }}
      >
        {children}
      </SubscriptionContext.Provider>
    </>
  );
};

export default SubscriptionProvider;
