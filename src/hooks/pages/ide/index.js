import React from 'react';
import post from '../../common/framework';

const useIde = () => {
  const [state, setState] = React.useState({
    selectedLanguageValue: '',
    input: '',
    output: false,
    writtenCode: false,
  });

  const runCodeRequest = (sourceCode, input, compilerId, token, recaptchaVersion = 3) => post({
    type: 'runCode',
    source: sourceCode,
    user_input: input,
    compilerId,
    token,
    recaptchaVersion,
  }, 'ide/');

  return { runCodeRequest, state, setState };
};

export default null;

export { useIde };
