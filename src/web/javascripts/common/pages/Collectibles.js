import React from 'react';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/collectibles/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';

const Awards = () => {
  pageInit('collectibles-container', 'Collectibles');

  return <>
   <MoreAccountNavBar />
   <div>Collectibles</div>
  </>;
};

export default Awards;
