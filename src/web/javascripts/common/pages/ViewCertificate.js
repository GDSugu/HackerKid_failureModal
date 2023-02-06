import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useViewCertificate } from '../../../../hooks/pages/certificate';
import '../../../stylesheets/common/pages/view-certificate/style.scss';
import { $, pageInit, timeTrack } from '../framework';
import { getCanvasFromElement, getParsedHtmlStringForCertificate } from '../Functions/certificates';

const ViewCertificate = () => {
  const isPageMounted = React.useRef(true);

  pageInit('view-certificate-container', 'View Certificate');

  timeTrack('view-certificate');

  const { id } = useParams();
  const navigate = useNavigate();
  // hooks
  const {
    state: viewCertificateState,
  } = useViewCertificate({ isPageMounted, certificateId: id });

  const {
    status,
    profileDetails,
    certificateData,
  } = viewCertificateState;

  useEffect(() => {
    if (status === 'error') {
      navigate('/dashboard');
    }

    if (status === 'success') {
      const { certificateId, certificateName } = certificateData;

      const certificateHtml = getParsedHtmlStringForCertificate(certificateId, certificateName,
        profileDetails.name);

      $('#certificateDOM').html(certificateHtml);

      getCanvasFromElement(document.querySelector('#certificateBlock')).then((canvas) => {
        $('.certificate-canvas-container').html('');
        $('.certificate-canvas-container').html(canvas);
      });
    }
  }, [viewCertificateState]);

  return <>
    <main className={`certificate-canvas-container ${status === false ? 'loading' : ''}`}>
      <div id='loader-partial'></div>
    </main>
    <div id='certificateDOM'></div>
  </>;
};

export default ViewCertificate;
