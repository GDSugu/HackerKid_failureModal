import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_modal.scss';

const Modal = ({
  children,
  customClass,
  options,
  modalTitle = '',
  onHidden = () => {},
  onShown = () => {},
}) => {
  useEffect(() => {
    $('#modal').modal(options || 'show');
    $('#modal').on('hidden.bs.modal', onHidden);
    $('#modal').on('shown.bs.modal', onShown);
  }, []);

  return <>
    <div className={`modal fade ${customClass}`} id="modal" tabIndex="-1" role="dialog" aria-labelledby="errorModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className='modal-header'>
            <h5 className='modal-title'>
              <FormattedMessage defaultMessage='{modalTitle}' description='modal title' values={{ modalTitle }} />
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-between">
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Modal;
