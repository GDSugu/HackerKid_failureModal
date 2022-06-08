import { useState } from 'react';

const useBackBtn = () => {
  const [stateObj, setStateObj] = useState({
    showBackBtn: true,
    backFn: null,
  });

  return {
    stateObj, setStateObj,
  };
};

export default useBackBtn;
