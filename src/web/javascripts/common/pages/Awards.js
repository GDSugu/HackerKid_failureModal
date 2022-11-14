import React from 'react';
import { FormattedMessage } from 'react-intl';
import { loginCheck, pageInit } from '../framework';
import '../../../stylesheets/common/pages/awards/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';
import AwardCard from '../components/AwardsCard';
import SortDropdown from '../components/SortDropdown';
import SearchBox from '../components/SearchBox';

const AwardInfo = ({ title, subtitle, logoPath }) => <div className='award-info'>
  <img src={logoPath} alt='award-logo' />
  <div className='award-details'>
    <h6 className='award-title'>
      <FormattedMessage defaultMessage={'{title}'} description='award title' values={{
        title,
      }} />
    </h6>
    <small className='award-subtitle'>
      <FormattedMessage defaultMessage={'{subtitle}'} description='award subtitle' values={{
        subtitle,
      }} />
    </small>
    <div className='progress-bar'>
      <div className='progress'></div>
    </div>
  </div>
</div>;

const Awards = () => {
  const isPageMounted = React.useRef(true);
  pageInit('awards-container', 'Awards');
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
      <div className='today mt-3'>
        <h5>
          <FormattedMessage defaultMessage={'Today'} description='section heading' />
        </h5>
        <div className='row award-cards-container mx-n2'>
          <div className='col-3 px-1 py-1'>
            <div className='award-card-with-awards-info'>
              <AwardCard interactable={true} className='pointer-cursor' />
              <AwardInfo
                title={'Consecutive Signin Award (3days)'}
                subtitle='Next Achievements 7days'
                logoPath={'../../../../../images/achievements/award1.png'} />
            </div>
          </div>
          <div className='col-3 px-1 py-1'>
            <div className='award-card-with-awards-info'>
              <AwardCard interactable={true} className='pointer-cursor' />
              <AwardInfo
                title={'Consecutive Signin Award (3days)'}
                subtitle='Next Achievements 7days'
                logoPath={'../../../../../images/achievements/award1.png'} />
            </div>
          </div>
          <div className='col-3 px-1 py-1'>
            <div className='award-card-with-awards-info'>
              <AwardCard interactable={true} className='pointer-cursor' />
              <AwardInfo
                title={'Consecutive Signin Award (3days)'}
                subtitle='Next Achievements 7days'
                logoPath={'../../../../../images/achievements/award1.png'} />
            </div>
          </div>
          <div className='col-3 px-1 py-1'>
            <div className='award-card-with-awards-info'>
              <AwardCard interactable={true} className='pointer-cursor' />
              <AwardInfo
                title={'Consecutive Signin Award (3days)'}
                subtitle='Next Achievements 7days'
                logoPath={'../../../../../images/achievements/award1.png'} />
            </div>
          </div>
        </div>
      </div>
      <div className='previous mt-3'>
        <h5>
          <FormattedMessage defaultMessage={'Previous Awards'} description='section heading' />
        </h5>
        <div className='row award-cards-container mx-n2'>
          <div className='col-3 px-1 py-1'>
          <div className='award-card-with-awards-info'>
              <AwardCard interactable={true} className='pointer-cursor' />
              <AwardInfo
                title={'Consecutive Signin Award (3days)'}
                subtitle='Next Achievements 7days'
                logoPath={'../../../../../images/achievements/award1.png'} />
            </div>
          </div>
          <div className='col-3 px-1 py-1'>
            <AwardCard interactable={true} className='pointer-cursor' />
            <AwardInfo
              title={'Consecutive Signin Award (3days)'}
              subtitle='Next Achievements 7days'
              logoPath={'../../../../../images/achievements/award1.png'} />
          </div>
          <div className='col-3 px-1 py-1'>
            <AwardCard interactable={true} className='pointer-cursor' />
            <AwardInfo
              title={'Consecutive Signin Award (3days)'}
              subtitle='Next Achievements 7days'
              logoPath={'../../../../../images/achievements/award1.png'} />
          </div>
          <div className='col-3 px-1 py-1'>
            <AwardCard interactable={true} className='pointer-cursor' />
            <AwardInfo
              title={'Consecutive Signin Award (3days)'}
              subtitle='Next Achievements 7days'
              logoPath={'../../../../../images/achievements/award1.png'} />
          </div>
          <div className='col-3 px-1 py-1'>
            <AwardCard interactable={true} className='pointer-cursor' />
            <AwardInfo
              title={'Consecutive Signin Award (3days)'}
              subtitle='Next Achievements 7days'
              logoPath={'../../../../../images/achievements/award1.png'} />
          </div>
          <div className='col-3 px-1 py-1'>
            <AwardCard interactable={true} className='pointer-cursor' />
            <AwardInfo
              title={'Consecutive Signin Award (3days)'}
              subtitle='Next Achievements 7days'
              logoPath={'../../../../../images/achievements/award1.png'} />
          </div>
        </div>
      </div>
    </main>
  </>;
};

export default Awards;
