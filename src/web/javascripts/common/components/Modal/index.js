import React, { useEffect } from 'react';
// import { FormattedMessage } from 'react-intl';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_modal.scss';

const Modal = ({
  children,
  customClass,
  modalClass,
  header = <></>,
  options,
  // modalTitle = '',
  onHidden = () => {},
  onShown = () => {},
  modalVisible,
}, ref) => {
  const modalRef = React.useRef(null);

  const modalClassSelector = `.${modalClass}`;

  React.useImperativeHandle(ref, () => ({
    show: () => {
      $(`#modal${modalClassSelector}`).modal('show');
    },
    hide: () => {
      $(`#modal${modalClassSelector}`).modal('hide');
    },
  }));

  useEffect(() => {
    if (modalVisible) {
      $(`#modal${modalClassSelector}`).modal(options || 'show');
    } else {
      $(`#modal${modalClassSelector}`).modal('hide');
    }

    $(`#modal${modalClassSelector}`).on('hidden.bs.modal', onHidden);
    $(`#modal${modalClassSelector}`).on('shown.bs.modal', onShown);

    return () => {
      $(`#modal${modalClassSelector}`).off('hidden.bs.modal');
      $(`#modal${modalClassSelector}`).off('shown.bs.modal');
      $(`#modal${modalClassSelector}`).modal('hide');
    };
  }, []);

  if (modalVisible) {
    $(`#modal${modalClassSelector}`).modal(options || 'show');
  } else {
    $(`#modal${modalClassSelector}`).modal('hide');
  }

  return <>
    <div ref={modalRef} className={`modal fade ${modalClass} ${customClass}`} id="modal" tabIndex="-1" role="dialog" aria-labelledby="errorModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* <div className='modal-header'>
            <h5 className='modal-title'>
              <FormattedMessage
                defaultMessage='{modalTitle}'
                description='modal title'
                values={{ modalTitle }} />
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> */}
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between modal-custom-header">
                { header }
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => $(`#modal${modalClassSelector}`).modal('hide')}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className='modal-container'>
                { children }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default React.forwardRef(Modal);
