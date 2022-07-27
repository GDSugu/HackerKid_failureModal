import { useState } from 'react';

const useBackBtn = () => {
  const [stateObj, setStateObj] = useState({
    showBackBtn: true,
    backFn: () => {

    },
  });

  return {
    stateObj, setStateObj,
  };
};

export default useBackBtn;
