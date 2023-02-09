import { useEffect, useState } from 'react';
import post from '../../common/framework';

const getPricing = ({ isPageMounted, setPricingDetails }) => {
  post({ type: 'getAllSubscription' }, 'subscriptionConfig/').then((res) => {
    if (isPageMounted.current) {
      const parsedRes = JSON.parse(res);
      setPricingDetails(parsedRes);
    }
  });
};

const usePricing = ({ isPageMounted }) => {
  const [pricingDetails, setPricingDetails] = useState({
    status: true,
    moduleData: false,
  });

  useEffect(() => {
    getPricing({ isPageMounted, setPricingDetails });
  }, []);

  const result = {
    pricingDetails,
    setPricingDetails,
  };

  return result;
};

export default usePricing;
