import React from 'react';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/certificates/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';
// import { useGetSession } from '../../../../hooks/pages/root';
import { useProfileInfo } from '../../../../hooks/pages/profile';
import CertificateComonent from '../components/CertificateComponent';

const Certificates = () => {
  pageInit('certificates-container', 'Certificates');

  const isPageMounted = React.useRef(true);
  // const { session: { uniqueUrl } } = useGetSession({
  //   sessionAttr: ['uniqueUrl'],
  //   isPageMounted
  // });
  // const uniqueUrlRef = React.useRef(uniqueUrl);
  const uniqueUrl = localStorage.getItem('uniqueUrl');

  const { state: { status, gameDetails, profileDetails } } = useProfileInfo({ action: 'getProfileData', uniqueurl: uniqueUrl, isPageMounted });

  // if (status === 'success') {
  //   console.log(gameDetails[0].certificateData);
  // }

  React.useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  return <>
   <MoreAccountNavBar />
   <div className="col-12 col-md-8 mx-auto">
    <div>hello</div>
    {
      status === 'success'
      && <CertificateComonent gameDetails={gameDetails[0]} profileDetails={profileDetails} />
    }
   </div>
  </>;
};

export default Certificates;
