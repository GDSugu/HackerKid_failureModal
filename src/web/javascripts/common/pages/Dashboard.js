import React from 'react';
import '../../../stylesheets/common/pages/dashboard/style.scss';
import { pageInit } from '../framework';

const Dashboard = () => {
  pageInit('dashboard-container', 'Dashboard');
  return <>
  <div>
    <div>
      dashboard
    </div>
  </div>
  </>;
};

export default Dashboard;
