import React from 'react';
import WebView from 'react-native-webview';

const CertificateWebView = () => {
  const getInitialScript = () => `
      try{
        const updateCertificateDOM = (certificateId, certificateName, studentName) => {
          $('.userName').html(studentName);
          $('.certificateBoldName').html(certificateName);
          $('.certificateId').html('ID: ' + certificateId);
        }

        const takeCertificateSnap = ()=>{
          window.scrollTo(0, 0);
          return html2canvas(document.querySelector('#certificateBlock'), {
            allowTaint:true,
            useCORS: true,
          });
        };

        const getCertificateImageDataUrl = ()=>{
          const canvasPromise = takeCertificateSnap();

          canvasPromise.then((canvas) => {
            const dataUrl = canvas.toDataURL();

            const obj={
              action:'getCertificateImageDataUrl',
              data: {
                dataUrl,
              }
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }).catch((e) => {
            const errmsg={
              action:'error',
              data: {
                cause: 'html2canvas',
                error: err.message,
              }
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
          });
        }

        window.execute = function(payload){
          switch (payload.action) {
            case 'updateCertificateDOM':
              const {certificateId, certificateName, studentName} = payload.data;

              updateCertificateDOM(certificateId, certificateName, studentName);
              break;
            case 'getCertificateImageDataUrl':
              getCertificateImageDataUrl();
              break;
            default: break;
          }
        }
      }catch(err) {
        const errmsg = {
          action: 'error',
          data: {
            cause: 'initial script',
            error: err.message,
          },
        };

      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
      }
    `;

  const webviewHtml = `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
      <style>
        * {
          padding:0;
          margin:0;
          box-sizing: border-box;
        }

        @font-face {
          font-family: 'Courgette';
          src: url('file:///android_asset/fonts/Courgette-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'DM Sans';
          src: url('file:///android_asset/fonts/DMSans-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .imageTemplate {
          height: 229px;
          width: 324px;
        }

        #certificateBlock {
          height: 229px;
          width: 324px;
          position: relative;
        }

        #certificateDOM {
          position: fixed;
          top: 0;

          &>div {
          height: 0;
          width: 0;
          overflow: scroll;
          }
        }

        .userName {
          position: absolute;
          top: 110px;
          right: 28px;
          font-size: 20px;
          text-transform: capitalize;
          font-family: 'Courgette', cursive, sans-serif;
          text-align: right;
          color: #F55151;
        }

        .certificateName {
          max-width: 200px;
          text-align: right;
          position: absolute;
          top: 138px;
          right: 28px;
          font-family: 'DM Sans', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 7px;
          line-height: 13px;
        }

        .certificateId {
          position: absolute;
          top: 5px;
          right: 10px;
          font-size: 6px;
          font-family: 'DM Sans', sans-serif;
          font-style: normal;
          font-weight: 400;
        }

        .certificateSign {
          position: absolute;
          top: 165px;
          right: 35px;
          height: 20px;
          width: 45px;
        }
      </style>
      <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js" integrity="sha256-6H5VB5QyLldKH9oMFUmjxw2uWpPZETQXpCkBaDjquMs=" crossOrigin="anonymous"></script>
    </head>
    <body>
    <div class="certificateDOM">
      <div class="container-fluid">
        <div class="row d-flex justify-content-center" id="certificateBlock">
          <img
            class="imageTemplate"
            src="file:///android_asset/images/certificate1.png"
            alt="certificate Image" />
          <span class="certificateId"></span>
          <span class="certificateName">is here by awarded the certification of achievement for the successfull completion of <b class='certificateBoldName'></b></span>
          <span class="userName"></span>
          <img class="certificateSign" src="file:///android_asset/images/authority1.png" alt="authority sign" />
        </div>
      </div>
    </div>
    </body>
  </html>`;

  // methods for CodeEditorWebView JavaScript injection
  const updateCertificateDOMJSString = (certificateId, certificateName, studentName) => {
    const obj = {
      action: 'updateCertificateDOM',
      data: {
        certificateId,
        certificateName,
        studentName,
      },
    };

    return `
      try {
        if (window.execute) {
          window.execute(${JSON.stringify(obj)});
        }
      } catch (err) {
        const errmsg = {
          action: 'error',
          data: err.message,
          caller: 'inject updateCertificateDOM',
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
      }
    `;
  };

  const getCertificateImageDataUrlJSString = () => {
    const obj = { action: 'getCertificateImageDataUrl' };

    return `
      try {
        if (window.execute) {
          window.execute(${JSON.stringify(obj)});
        }
      } catch (err) {
        const errmsg = {
          action: 'error',
          data: err.message,
          caller: 'inject getCertificateImageDataUrl',
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
      }
    `;
  };

  const onCertificateImagePress = (certificateId, certificateName, studentName) => {
    const toInjectScript = updateCertificateDOMJSString(certificateId, certificateName,
      studentName);

    certificateWebViewRef.current.injectJavaScript(toInjectScript);

    setTimeout(() => {
      certificateWebViewRef.current.injectJavaScript(getCertificateImageDataUrlJSString());
    }, 500);
  };

  const onMessage = (msg) => {
    const message = JSON.parse(msg.nativeEvent.data);
    console.log(message);
  };

  return <WebView
    ref={certificateWebViewRef}
    originWhitelist={['*']}
    source={{ html: webviewHtml, baseUrl: '' }}
    style={{
      height: 229,
      width: 324,
      resizeMode: 'contain',
      flex: 1,
      alignSelf: 'center',
    }}
    injectedJavaScript={getInitialScript()}
    onMessage={onMessage}
    scalesPageToFit={false}
  />;
};
