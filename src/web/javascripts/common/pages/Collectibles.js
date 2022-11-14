import React from 'react';
import { FormattedMessage } from 'react-intl';
import { loginCheck, pageInit } from '../framework';
import '../../../stylesheets/common/pages/collectibles/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';
import SortDropdown from '../components/SortDropdown';
import SearchBox from '../components/SearchBox';
import CollectibleCard from '../components/CollectibleCard';

const Awards = () => {
  const isPageMounted = React.useRef(true);
  pageInit('collectibles-container', 'Collectibles');

  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);
  React.useEffect(() => {
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
    <main className='col-12 col-sm-10 col-md-8 col-xl-6 mx-auto mt-3'>
      <div className='controls'>
        <SortDropdown isDesktop={isDesktop} />
        <SearchBox />
      </div>
      <div className='recently-closed mt-4'>
        <h5 className='section-title subtitle1'>
          <FormattedMessage defaultMessage={'Recently Collected'} description='page title' />
        </h5>
        <div className='row collectible-cards-container mt-4'>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Common'} />
          </div>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Rare'} />
          </div>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Rare'} />
          </div>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Rare'} />
          </div>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Rare'} />
          </div>
          <div className='col-3 py-1 px-1'>
            <CollectibleCard rarity={'Rare'} />
          </div>
        </div>
      </div>
    </main>
  </>;
};

export default Awards;
