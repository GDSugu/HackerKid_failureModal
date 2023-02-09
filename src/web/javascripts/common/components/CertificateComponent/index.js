import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';
import { $ } from '../../framework';

const CertificateComonent = ({ gameDetails, profileDetails }) => {
  const { certificateData } = gameDetails;

  useEffect(() => {
    Object.values(certificateData).forEach((certificate, index) => {
      $('#certificateDOM').html(`
        <div class="container-fluid">
        <div class="row d-flex justify-content-center" id="certificateBlock">
          <img class="imageTemplate" src="/images/common/certificate.png" alt="certificate Image">
          <span class="certificateId">ID: ${certificate.certificateId.toUpperCase()}</span>
          <span class="certificateName">${certificate.certificateName}</span>
          <span class="userName">${profileDetails.name}</span>
          <img class="certificateSign" src="/images/common/authority1.png" alt="authority sign">
        </div>
      </div>
      `);

      window.scrollTo(0, 0);
      html2canvas(document.querySelector('#certificateBlock'))
        .then((canvas) => {
          if (canvas) {
            // manager.certificateCanvas[certificateData.certificateId] = canvas;
            $((index > 5) ? '.more-certificates-container' : '.certificate-container')
              .append($('<div class="action-container"></div>').html(canvas).append(`
                <div class="d-flex justify-content-center">
                  <a href="#" class="fa-stack px-1 viewCertificate" data-toggle="tooltip" data-placement="top" title="View Certificate" data-certificateid="${certificate.certificateId}">
                    <i class="fas fa-square fa-stack-2x square-color"></i>
                    <i class="fas fa-eye fa-stack-1x fa-inverse"></i>
                  </a>
                  ${profileDetails.selfProfile ? `
                    <a target="_blank" href="/certificate/snap/${certificate.certificateId}" class="fa-stack px-1" data-toggle="tooltip" data-placement="top" title="Take Selfie">
                      <i class="fas fa-square fa-stack-2x square-color"></i>
                      <i class="fas fa-camera fa-stack-1x fa-inverse"></i>
                    </a>
                    <a href="#" data-certificateid="${certificate.certificateId}" class="fa-stack px-1 download" data-toggle="tooltip" data-placement="top" title="Download Certificate">
                      <i class="fas fa-square fa-stack-2x square-color"></i>
                      <i class="fas fa-download fa-stack-1x fa-inverse"></i>
                    </a>
                  ` : ''}
                </div>
            `));
            $('[data-toggle="tooltip"]').tooltip();
            $('#loader-partial').hide();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return <>
    <div id='certificateDOM'>

    </div>
  </>;
};

export default CertificateComonent;
