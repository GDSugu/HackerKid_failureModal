import React, { useEffect } from 'react';
import '../../../../stylesheets/common/sass/components/_bottomSheet.scss';
import { $ } from '../../framework';

const BottomSheet = ({ children, id }) => {
  useEffect(() => () => {
    $(id).modal('hide');
    $('.modal-backdrop').remove();
  }, []);

  return (
  <div className="modal modal-bottom-sheet fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="bottomSheetModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-slideout" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div className="sheet-content">
            <div className="sheet-close-handle-bar close" data-dismiss="modal"></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default BottomSheet;
