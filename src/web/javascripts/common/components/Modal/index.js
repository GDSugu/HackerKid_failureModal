import React, { useEffect } from 'react';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_modal.scss';

const Modal = ({
  children,
  customClass,
  options,
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
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Modal;
