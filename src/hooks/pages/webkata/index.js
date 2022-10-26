import React, { useState } from 'react';
import post from '../../common/framework';

const useWebkataFetchQuestion = ({
  isPageMounted, initializeData = true, conceptid, virtualid,
}) => {
  const [state, setState] = useState({
    status: false,
    questionList: false,
    questionObject: false,
    submissionStatus: false,
  });

  const fetchWebkataQuestion = (conceptId = conceptid, virtualId = virtualid) => {
    const payload = {
      type: 'fetchQuestion',
      conceptId: conceptId.toUpperCase(),
      virtualId: Number(virtualId),
    };
    let result;

    if (isPageMounted.current) {
      result = post(payload, 'webkata/').then((res) => {
        const data = JSON.parse(res);

        setState((prev) => ({
          ...prev,
          ...data,
        }));
      });
    }

    return result;
  };

  React.useEffect(() => {
    if (initializeData) {
      fetchWebkataQuestion();
    }
  }, []);

  return {
    state,
    setState,
    fetchWebkataQuestion,
  };
};

export default null;

export {
  useWebkataFetchQuestion,
};
