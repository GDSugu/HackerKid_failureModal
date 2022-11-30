import React from 'react';
import post from '../../common/framework';

const useIde = ({ isPageMounted }) => {
  const [state, setState] = React.useState({
    selectedLanguageValue: '',
    input: '',
    output: false,
    writtenCode: false,
  });

  const runCodeRequest = (sourceCode, input, compilerId, token, recaptchaVersion = 3) => {
    let result;

    if (isPageMounted.current) {
      result = post({
        type: 'runCode',
        source: sourceCode,
        user_input: input,
        compilerId,
        token,
        recaptchaVersion,
      }, 'ide/');
    }

    return result;
  };

  return { runCodeRequest, state, setState };
};

export default null;

export { useIde };
