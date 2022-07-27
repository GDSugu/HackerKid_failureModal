import React from 'react';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/awards/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';

const Awards = () => {
  pageInit('awards-container', 'Awards');

  return <>
   <MoreAccountNavBar />
   <div>Awards</div>
  </>;
};

export default Awards;
