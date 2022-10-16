import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_your-challenges-actions-modal.scss';
import { useUpdateChallengeStateOnly } from '../../../../../hooks/pages/challenges';

const YourChallengeActionsModal = ({
  open, setOpen, setActionTaken, challenge, onActionsModalHide,
}) => {
  const [state, setState] = useState({
    toastOpen: false,
    toastMessage: false,
  });

  const updateChallengeStateOnly = useUpdateChallengeStateOnly();

  useEffect(() => {
    $('#yourChallengesActionsModal').modal(open ? 'show' : 'hide');
  }, [open]);

  useEffect(() => {
    $('#yourChallengesActionsModal').on('hidden.bs.modal', () => {
      setOpen(false);
      setState((prev) => ({ ...prev, toastOpen: false, toastMessage: false }));
      onActionsModalHide();
      $('.action-btn').removeAttr('disabled');
    });
  }, []);

  const onTakeActionButtonClick = (e, challengeId, challengeState) => {
    $(e.target).attr('disabled', true);

    updateChallengeStateOnly(challengeId, challengeState).then((res) => {
      const data = JSON.parse(res);

      if (data.status === 'success') {
        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: challengeState === 'published' ? 'Challenge published successfully' : 'Challenge moved to drafts',
        }));
        setActionTaken(true);
      } else if (data.status === 'error') {
        console.error(data.message);
        $(e.target).removeAttr('disabled');

        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: 'Something went wrong! Please try again',
        }));
      }
    });
  };

  return (
  <div className="modal fade" id="yourChallengesActionsModal" tabIndex="-1" aria-labelledby="yourChallengesActionsModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="yourChallengesActionsModalLabel">
            <FormattedMessage defaultMessage={'{challengeName}'} description='modal title' values={{
              challengeName: challenge.challengeName,
            }}/>
          </h5>
          <button type="button" className="close-btn" onClick={() => setOpen(false)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31 26C31 28.75 28.75 31 26 31H6C3.25 31 1 28.75 1 26V6C1 3.25 3.25 1 6 1H26C28.75 1 31 3.25 31 6V26Z" fill="#FF5A79"/>
            <path d="M25 10.6L21.4 7L16 12.4L10.6 7L7 10.6L12.4 16L7 21.4L10.6 25L16 19.6L21.4 25L25 21.4L19.6 16L25 10.6Z" fill="white"/>
          </svg>
          </button>
        </div>
        <div className="modal-body">
          <img src={challenge.imgPath} alt='challenge image' className='challenge-image-preview' />
          <div className='btn-group'>
            {
                challenge.challengeState === 'published' && <button
                  type='button'
                  className='btn-block action-btn caption-bold'
                  onClick={(e) => onTakeActionButtonClick(e, challenge.challengeId, 'draft')
                  }
                >
                <FormattedMessage defaultMessage={'Move to Drafts'} description='move to drafts button'/>
              </button>
            }
            {
                challenge.challengeState === 'draft' && <button
                  type='button'
                  className='btn-block action-btn caption-bold'
                  onClick={(e) => onTakeActionButtonClick(e, challenge.challengeId, 'published')}
                >
              <FormattedMessage defaultMessage={'Publish'} description='publish challenge button'/>
            </button>
            }
            <Link to={'#'} className='btn-block action-btn caption-bold'>
              <FormattedMessage defaultMessage={'Edit Challenge'} description='edit challenge button'/>
            </Link>
              <button
                type='button'
                className='btn btn-block btn-danger delete-challenge-button caption-bold'
                disabled={true}>
              <FormattedMessage defaultMessage={'Delete Challenge'} description='delete challenge button'/>
            </button>
          </div>
        </div>
      </div>
    </div>
      <div className={`modal-toast ${state.toastOpen === false ? 'hide' : ''}`}>
      <h6 className='toast-message caption'>
        <FormattedMessage defaultMessage={'{toastMessage}'} description='toast message'
          values={{ toastMessage: state.toastMessage }}/>
      </h6>
      <button type='button' className='btn btn-outline-primary btn-block' onClick={() => setState((prev) => ({ ...prev, toastOpen: false }))}>
        <FormattedMessage defaultMessage={'Dismiss'} description='dismiss btn' />
      </button>
    </div>
  </div>
  );
};

export default YourChallengeActionsModal;
