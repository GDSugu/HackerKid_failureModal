import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import AwardCard from '../AwardsCard';
import '../../../../stylesheets/common/sass/components/_awards-notification-modal.scss';
import { $ } from '../../framework';

const AwardsNotificationCard = ({ onClose = () => { }, onOpen = () => { } }, ref) => {
  const [state, setState] = useState({
    visible: false,
    awards: false,
  });

  const { visible, awards } = state;

  const show = (awardsToShow) => {
    if (awardsToShow) {
      setState((prev) => ({
        ...prev,
        visible: true,
        awards: awardsToShow,
      }));
      onOpen();
    }
  };

  const hide = () => {
    setState((prev) => ({
      ...prev,
      visible: false,
    }));
    onClose();
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  // const onWheel = (e) => {
  //   console.log(e);
  // };

  return <div
    // eslint-disable-next-line no-underscore-dangle
    className={`awards-notification-card ${visible ? 'd-block' : 'd-none'} ${$('.modal').data('bs.modal')?._isShown ? '' : 'overlay'}`}
    id="awards-notification-card" tabIndex="-1">
    <div className={`card-dialog ${visible && 'open'}`}>
      <div className="card-body">
        <div className={`awards-carosel ${awards.length < 5 ? 'justify-content-center' : ''}`}
        // onWheel={onWheel}
        >
          {
            awards
            && awards.map((award, idx) => <AwardCard
              key={idx}
              awardImage={award.awardImage}
              awardName={award.awardName}
              className={`${(idx !== 0 || idx !== awards.length - 1) ? 'mr-2' : ''}`}
            />)
          }
        </div>
        <h5 className='body card-description'>
          <FormattedMessage
            defaultMessage={'{modalDescription}'}
            description='modal description'
            values={{
              modalDescription: awards && awards.length > 1 ? `You received ${awards.length} new awards` : 'You received a new award',
            }}
          />
        </h5>
      </div>
      <footer className="card-footer">
        <button
          type="button"
          className="btn btn-secondary dismiss-awards-notification-modal-btn"
          data-dismiss="modal"
          onClick={hide}
        >
          <FormattedMessage defaultMessage={'Dismiss'} description='dismiss btn text' />
        </button>
        <Link className="btn btn-primary view-awards-btn" to={'/awards'} onClick={onClose}>
          <FormattedMessage defaultMessage={'{btnText}'} description='view awards btn' values={{
            btnText: awards && awards.length > 1 ? 'View awards' : 'View award',
          }} />
        </Link>
      </footer>
    </div>
  </div>;
};

export default forwardRef(AwardsNotificationCard);
