import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { saveAs } from 'file-saver';
import { $, pageInit } from '../framework';
import '../../../stylesheets/common/pages/certificates/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';
import { useProfileInfo } from '../../../../hooks/pages/profile';
import { loginCheck } from '../../../../hooks/common/framework';
import SortDropdown from '../components/SortDropdown';
import SearchBox from '../components/SearchBox';
import Modal from '../components/Modal';
import { getParsedHtmlStringForCertificate, getCanvasFromElement } from '../Functions/certificates';
import { copyHandler } from '../Functions/turtle';

const CertificateItem = ({
  certificateId,
  certificateImageSrc,
  certificateName,
  onCertificateImageClick,
  onShareBtnClick,
}) => <div className='certificate body'>
    {
      certificateImageSrc
      && <img className='certificate-image'
        onClick={onCertificateImageClick}
        tabIndex={0}
        src={certificateImageSrc}
        alt='certificate-image' />
    }
    {
      !certificateImageSrc
      && <div className='certificate-image-skeleton'></div>
    }
    <FormattedMessage defaultMessage={'Received {certificateName}'} description='certificate name' values={{
      certificateName,
    }} />
    <button type='button' className='share-certificate-btn' onClick={onShareBtnClick} data-certificate-id={certificateId}>
      <img src='../../../../images/common/black-share-icon.svg' alt='share-icon' />
    </button>
  </div>;

const Certificates = () => {
  const isPageMounted = React.useRef(true);
  const certificateViewModal = React.useRef(true);
  const shareCertificateModalRef = React.useRef(true);
  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);

  pageInit(`certificates-container ${!isDesktop ? 'mob-certificates-container' : ''}`, 'Certificates');

  const [localState, setLocalState] = useState({
    originalCertificatesList: false,
    sort: 'posted',
    currentList: false,
    templateCertificateDataUrl: false,
    viewModalCertificateCanvas: false,
    toViewCertificate: false,
  });

  const {
    originalCertificatesList,
    sort,
    currentList,
    templateCertificateDataUrl,
    viewModalCertificateCanvas,
    toViewCertificate,
  } = localState;

  const setOriginalCertificatesList = (list) => {
    setLocalState((prev) => ({ ...prev, originalCertificatesList: list }));
  };

  const setSort = (toSetSort) => {
    setLocalState((prev) => ({ ...prev, sort: toSetSort }));
  };

  const setCurrentList = (listToBeSet) => {
    setLocalState((prev) => ({ ...prev, currentList: listToBeSet }));
  };

  const setTemplateCertificateDataUrl = (dataUrl) => {
    setLocalState((prev) => ({ ...prev, templateCertificateDataUrl: dataUrl }));
  };

  const setViewModalCertificateCanvas = (canvas) => {
    setLocalState((prev) => ({ ...prev, viewModalCertificateCanvas: canvas }));
  };

  const setToViewCertificate = (certificate) => {
    setLocalState((prev) => ({ ...prev, toViewCertificate: certificate }));
  };

  const {
    state: {
      uniqueUrl,
    },
  } = useProfileInfo({ isPageMounted });
  const {
    state: {
      status,
      gameDetails,
      profileDetails,
    },
    getProfileData,
  } = useProfileInfo({ isPageMounted, action: 'getProfileData', uniqueurl: uniqueUrl });

  const onDateWiseSort = (list, currentSort) => {
    setSort(currentSort);
    let compartorFn;

    if (currentSort === 'posted') {
      compartorFn = (a, b) => b - a;
    } else if (currentSort === 'reverse-posted') {
      compartorFn = (a, b) => a - b;
    }

    const certificates = [...list];

    const timeStampToCertificateMap = {};

    certificates.forEach((certificate) => {
      if (timeStampToCertificateMap[certificate.createdAt]) {
        timeStampToCertificateMap[certificate.createdAt].push(certificate);
      } else {
        timeStampToCertificateMap[certificate.createdAt] = [certificate];
      }
    });

    const sortedKeys = Object.keys(timeStampToCertificateMap).map(Number).sort(compartorFn);

    const finalList = {};

    sortedKeys.forEach((timeStamp) => {
      const timeStampDMY = moment.unix(timeStamp).format('DD/MM/YYYY');
      const nowDMY = moment().format('DD/MM/YYYY');
      const yesterdayDMY = moment().subtract(1, 'days').format('DD/MM/YYYY');

      let dateString = moment.unix(timeStamp).format('DD/MM/YYYY');

      if (timeStampDMY === nowDMY) {
        dateString = 'Today';
      } else if (timeStampDMY === yesterdayDMY) {
        dateString = 'Yesterday';
      }

      finalList[dateString] = timeStampToCertificateMap[timeStamp];
    });

    setCurrentList(finalList);
  };

  const onAlphabeticalSort = (list, currentSort) => {
    setSort(currentSort);
    let compartorFn;

    if (currentSort === 'alphabetical') {
      compartorFn = (a, b) => a.certificateName.localeCompare(b.certificateName);
    } else if (currentSort === 'reverse-alphabetical') {
      compartorFn = (a, b) => -1 * a.certificateName.localeCompare(b.certificateName);
    }
    const toSortArr = [...list];
    toSortArr.sort(compartorFn);
    setCurrentList(toSortArr);
  };

  const sortList = (list, sortClicked) => {
    setSort(sortClicked);

    if (sortClicked === 'posted' || sortClicked === 'reverse-posted') {
      onDateWiseSort(list, sortClicked);
    } else if (sortClicked === 'alphabetical' || sortClicked === 'reverse-alphabetical') {
      onAlphabeticalSort(list, sortClicked);
    }
  };

  const onSearhBoxChange = (searchQuery) => {
    const filteredList = originalCertificatesList.filter((certificate) => {
      const lowerCaseName = certificate.certificateName.toLowerCase();
      const lowerCaseQuery = searchQuery.toLowerCase();

      return lowerCaseName.includes(lowerCaseQuery);
    });
    sortList(filteredList, sort);
  };

  const showViewModal = () => certificateViewModal.current.show();

  const onCertificateImageClick = (certificate) => {
    try {
      const { certificateId, certificateName } = certificate;

      const parsedCertificateHtml = getParsedHtmlStringForCertificate(certificateId,
        certificateName, profileDetails.name);

      $('#certificateDOM').html(parsedCertificateHtml);

      const canvasPromise = getCanvasFromElement(document.querySelector('#certificateBlock'));

      canvasPromise.then((canvas) => {
        setViewModalCertificateCanvas(canvas);
      }).catch((e) => {
        console.error(e);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDownloadBtnClick = () => {
    viewModalCertificateCanvas.toBlob((blob) => {
      const fileName = `certificate - ${toViewCertificate.certificateId} - ${new Date().getTime()}`;
      saveAs(blob, `${fileName}.png`);
    });
  };

  const onShareBtnClick = (e) => {
    certificateViewModal.current.hide();
    const target = $(e.target);
    const certificateId = target.attr('data-certificate-id');
    $('.copy-link-input').val(`${window.location.origin}/certificate/view/${certificateId}`);
    shareCertificateModalRef.current.show();
  };

  useEffect(() => {
    if (originalCertificatesList && originalCertificatesList.length) {
      sortList(originalCertificatesList, 'posted');

      const templateCertificate = originalCertificatesList[0];
      const { certificateId, certificateName } = templateCertificate;

      const parsedCertificateHtml = getParsedHtmlStringForCertificate(certificateId,
        certificateName, profileDetails.name);

      $('#certificateDOM').html(parsedCertificateHtml);

      const canvasPromise = getCanvasFromElement(document.querySelector('#certificateBlock'));

      canvasPromise.then((canvas) => {
        const dataUrl = canvas.toDataURL();

        setTemplateCertificateDataUrl(dataUrl);
      }).catch((e) => {
        console.error(e);
      });
    } else if (originalCertificatesList && originalCertificatesList.length === 0) {
      setCurrentList([]);
    }
  }, [originalCertificatesList]);

  useEffect(() => {
    if (gameDetails) {
      const allCertificatesObject = gameDetails[0].certificateData;
      setOriginalCertificatesList(Object.values(allCertificatesObject));
    }
  }, [gameDetails]);

  useEffect(() => {
    getProfileData({ cached: false });
  }, [uniqueUrl]);

  useEffect(() => {
    loginCheck();
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <MoreAccountNavBar />
    <main className='col-12 col-sm-10 col-md-8 col-xl-6 mx-auto'>
      {
        (originalCertificatesList.length > 0)
        && <div className='controls'>
          <SortDropdown
            sort={sort}
            isDesktop={isDesktop}
            onSortOptionClick={(sortClicked) => sortList(originalCertificatesList, sortClicked)} />
          <SearchBox
            name='certificates-search'
            className='certificates-search-box'
            id='certificates-search'
            onChange={onSearhBoxChange}
          />
        </div>
      }
      <div className='certificates-main-container'>
        {
          (status === 'error' || (currentList && (currentList.length === 0 || Object.keys(currentList).length === 0)))
          && <h4 className='no-certificates text-center mt-4'>
            <FormattedMessage
              defaultMessage={'No Certificates Found'}
              description='no certificates found text'
            />
          </h4>
        }
        {
          currentList && (sort === 'posted' || sort === 'reverse-posted')
          && Object.keys(currentList).map((dateString, idx) => <div className='date-with-certificate-list' key={idx}>
            <h5 className='date-title body-bold'>
              <FormattedMessage defaultMessage={'{dateString}'} description='date' values={{ dateString }} />
            </h5>
            <div className={`certificates-list ${currentList[dateString].length > 1 ? 'multiple' : ''}`}>
              {
                currentList[dateString].map((certificate, index) => <CertificateItem
                  key={index}
                  certificateId={certificate.certificateId}
                  certificateImageSrc={templateCertificateDataUrl}
                  certificateName={certificate.certificateName}
                  onCertificateImageClick={() => {
                    showViewModal();
                    setToViewCertificate(certificate);
                    onCertificateImageClick(certificate);
                  }}
                  onShareBtnClick={onShareBtnClick}
                />)
              }
            </div>
          </div>)
        }
        {
          currentList && (Array.isArray(currentList))
          && <div className={`certificates-list ${currentList.length > 1 ? 'multiple' : ''}`}>
            {
              currentList.map((certificate, idx) => <CertificateItem
                key={idx}
                certificateImageSrc={templateCertificateDataUrl}
                certificateName={certificate.certificateName}
                onCertificateImageClick={() => {
                  showViewModal();
                  setToViewCertificate(certificate);
                  onCertificateImageClick(certificate);
                }}
                onShareBtnClick={() => shareCertificateModalRef.current.show()}
              />)
            }
          </div>
        }
      </div>
    </main>
    <div id='certificateDOM'>
    </div>
    <Modal
      ref={certificateViewModal}
      modalClass={'certificate-view-modal'}
      customClass={`curved ${!isDesktop ? 'mob-certificate-view-modal' : ''}`}
      options={'hide'}
    >
      {
        viewModalCertificateCanvas
        && <>
          <div>
            <img src={viewModalCertificateCanvas.toDataURL('image/jpeg', 1.0)} className='view-modal-certificate-image' alt='certificate-img' />
          </div>
          <div className='share-download-btns-container modal-footer'>
            <button
              type='button'
              className='share-btn btn btn-primary'
              data-certificate-id={toViewCertificate.certificateId}
              onClick={onShareBtnClick}
            >
              <FormattedMessage defaultMessage={'Share'} description='share btn' />
            </button>
            <button
              type='button'
              className='download-btn btn btn-outline-primary'
              onClick={onDownloadBtnClick}
            >
              <FormattedMessage defaultMessage={'Download'} description='download btn' />
            </button>
          </div>
        </>
      }
      {
        !viewModalCertificateCanvas
        && <div className='view-modal-certificate-image-skeleton'></div>
      }
    </Modal>
    <Modal
      ref={shareCertificateModalRef}
      modalClass={'share-certificate-modal'}
      customClass={'curved'}
      options={'hide'}>
      <div className='share-content'>
        <div className='content-header'>
          <h5>
            <FormattedMessage
              defaultMessage={'Share'}
              description={'Share message'}
            />
          </h5>
        </div>
        <div className="col-11 col-md-10 btn-container">
          <div className="form-group col">
            <input
              type="text"
              className="form-control copy-link-input"
              name="shareLink" id="shareLink"
              aria-describedby="helpId"
              placeholder="share link"
              readOnly />
          </div>
          <button className='btn btn-outline-primary' onClick={copyHandler} >
            <FormattedMessage
              defaultMessage={'Copy Link'}
              description={'Copy Link button'}
            />
          </button>
        </div>
      </div>
    </Modal>
  </>;
};

export default Certificates;
