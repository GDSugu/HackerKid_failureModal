import post from '../../common/framework';

const useIde = () => {
  const runCodeRequest = (sourceCode, input, compilerId, token, recaptchaVersion) => post({
    type: 'runCode',
    source: sourceCode,
    user_input: input,
    compilerId,
    token,
    recaptchaVersion,
  }, 'ide/');

  return runCodeRequest;
};

export default null;

export { useIde };
