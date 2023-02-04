import { useEffect, useState } from 'react';
import API from '../../../../env';
import post from '../../common/framework';

const useViewCertificate = ({ certificateId, isPageMounted }) => {
  const [state, setState] = useState({
    status: false,
    profileDetails: false,
    certificateData: false,
  });

  const getCertificateById = () => {
    const payload = {
      type: 'viewCertificate',
      s3Prefix: API.S3PREFIX,
      certificateId,
    };

    const result = post(payload, 'certificate/').then((res) => {
      if (isPageMounted.current) {
        const data = JSON.parse(res);
        setState(data);
      }
    });

    return result;
  };

  useEffect(() => {
    getCertificateById();
  }, []);

  return {
    state,
  };
};

export default null;

export {
  useViewCertificate,
};
