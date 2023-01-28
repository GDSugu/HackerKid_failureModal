import { useEffect } from 'react';
import { $, loadScriptByURL } from '../../../web/javascripts/common/framework';
import API from '../../../../env';

const useRecapchav3 = () => {
  useEffect(() => {
    loadScriptByURL('recaptcha-key', `https://www.google.com/recaptcha/api.js?render=${API.RECAPCHAV3SITEKEY}`);

    return () => {
      $('#recaptcha-key').remove();
      $('.grecaptcha-badge').remove();
    };
  }, []);

  const getRecapchaToken = (executeOptions) => new Promise((resolve, reject) => {
    if (!executeOptions) {
      reject(new Error('Execute Options required'));
    }
    if (Array.isArray(executeOptions) || typeof executeOptions !== 'object') {
      reject(new Error('Object Expected'));
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(API.RECAPCHAV3SITEKEY, executeOptions)
        .then((token) => resolve(token))
        .catch((err) => reject(err));
    });
  });

  return getRecapchaToken;
};

export default useRecapchav3;
