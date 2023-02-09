import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_your-challenges-actions-modal.scss';
import { useDeleteChallenge, useUpdateChallengeStateOnly } from '../../../../../hooks/pages/challenges';

const YourChallengeActionsModal = ({
  open, setOpen, setActionTaken, challenge, onActionsModalHide,
}) => {
  const [state, setState] = useState({
    toastOpen: false,
    toastMessage: false,
    btnsDisabled: false,
  });

  const updateChallengeStateOnly = useUpdateChallengeStateOnly();
  const deleteChallengeRequest = useDeleteChallenge();

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

    return () => {
      $('#yourChallengesActionsModal').modal('hide');
    };
  }, []);

  const onTakeActionButtonClick = (e, challengeId, challengeState) => {
    updateChallengeStateOnly(challengeId, challengeState).then((res) => {
      const data = JSON.parse(res);

      if (data.status === 'success') {
        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: challengeState === 'published' ? 'Challenge published successfully' : 'Challenge moved to drafts',
          btnsDisabled: true,
        }));
        setActionTaken(true);
      } else if (data.status === 'error') {
        $(e.target).removeAttr('disabled');

        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: 'Something went wrong! Please try again',
          btnsDisabled: false,
        }));
      }
    });
  };

  const onDeleteChallengeClick = (e, challengeId) => {
    deleteChallengeRequest(challengeId).then((res) => {
      const data = JSON.parse(res);

      if (data.status === 'success') {
        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: 'Challenge deleted successfully',
          btnsDisabled: true,
        }));
        setActionTaken(true);
      } else if (data.status === 'error') {
        console.error(data.message);

        setState((prev) => ({
          ...prev,
          toastOpen: true,
          toastMessage: 'Something went wrong! Please try again',
          btnsDisabled: false,
        }));
      }
    });
  };

  const onEditChallengeClicked = (challengeData) => {
    const pathname = `/turtle/challenges/create/${challengeData.challengeId}/${challengeData.challengeName}`;
    window.location.pathname = pathname;
  };

  return (
    <div className="modal fade" id="yourChallengesActionsModal" tabIndex="-1" aria-labelledby="yourChallengesActionsModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        {
          !state.toastOpen && <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="yourChallengesActionsModalLabel">
                <FormattedMessage defaultMessage={'{challengeName}'} description='modal title' values={{
                  challengeName: challenge.challengeName,
                }} />
              </h5>
              <button type="button" className="close-btn" onClick={() => setOpen(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={challenge.imgPath} alt='challenge image' className='challenge-image-preview' />
              <div className='btn-group'>
                {
                  challenge.challengeState === 'published' && <button
                    type='button'
                    className='btn-block action-btn caption-bold'
                    onClick={(e) => onTakeActionButtonClick(e, challenge.challengeId, 'draft')}
                    disabled={state.btnsDisabled}
                  >
                    <FormattedMessage defaultMessage={'Move to Drafts'} description='move to drafts button' />
                  </button>
                }
                {
                  challenge.challengeState === 'draft' && <button
                    type='button'
                    className='btn-block action-btn caption-bold'
                    onClick={(e) => onTakeActionButtonClick(e, challenge.challengeId, 'published')}
                    disabled={state.btnsDisabled}
                  >
                    <FormattedMessage defaultMessage={'Publish'} description='publish challenge button' />
                  </button>
                }
                <button onClick={() => onEditChallengeClicked(challenge)} className='btn-block action-btn caption-bold'>
                  <FormattedMessage defaultMessage={'Edit Challenge'} description='edit challenge button' />
                </button>
                <button
                  type='button'
                  className='btn btn-block btn-danger delete-challenge-button caption-bold'
                  onClick={(e) => onDeleteChallengeClick(e, challenge.challengeId)}
                  disabled={state.btnsDisabled}
                >
                  <FormattedMessage defaultMessage={'Delete Challenge'} description='delete challenge button' />
                </button>
              </div>
            </div>
          </div>
        }
      </div>
      <div className={`modal-toast ${state.toastOpen === false ? 'hide' : ''}`}>
        <h6 className='toast-message caption'>
          <FormattedMessage defaultMessage={'{toastMessage}'} description='toast message'
            values={{ toastMessage: state.toastMessage }} />
        </h6>
        <button type='button' className='btn btn-outline-primary btn-block toast-dismiss-btn' onClick={() => setOpen(false)}>
          <FormattedMessage defaultMessage={'Dismiss'} description='dismiss btn' />
        </button>
      </div>
    </div>
  );
};

export default YourChallengeActionsModal;
