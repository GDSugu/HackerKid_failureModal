import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_errorModal.scss';

const ErrorModal = ({ options }) => {
  useEffect(() => {
    $('#errorModal').modal(`${options || 'show'}`);
  }, []);

  return <>
    <div className="modal fade" id="errorModal" tabIndex="-1" role="dialog" aria-labelledby="errorModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="container">
                <p className='text-center my-5'>
                  <FormattedMessage
                    defaultMessage='Something went wrong. Please try again'
                    description='error modal'
                  />
                </p>
              </div>
              <button
                className='btn btn-block btn-primary'
                onClick={() => { window.location.reload(); }}
              >
                <FormattedMessage
                  defaultMessage='Try again'
                  description='try again btn'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default ErrorModal;
