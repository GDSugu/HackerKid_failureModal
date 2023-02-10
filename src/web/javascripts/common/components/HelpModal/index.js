import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../Modal';
import '../../../../stylesheets/common/sass/components/_help-modal.scss';

const HelpType = ({ text, iconPath, label = '' }) => (
    <div className='help-type-container'>
    <div className='text'>
      {
        label && <label className='caption-bold'>
        <FormattedMessage defaultMessage='{label}' description='help type label' values={{ label }}/>
      </label>
      }
        <p className='caption-bold m-0'>
        <FormattedMessage defaultMessage='{text}' description='help type text' values={{ text }}/>
        </p>
      </div>
      <img src={ iconPath} className='icon' alt='help-type-icon'></img>
    </div>
);

const HelpModal = () => (
    <Modal
      modalClass='help-modal'
      customClass='curved'
      modalTitle='Help'
      options='hide'
      header = {
        <div>
          <h5 className="modal-title">
            <FormattedMessage
              defaultMessage={'Help'}
              description={'Help modal title'}
            />
            </h5>
        </div>
      }>
        <div className='col-12 col-md-10 mx-auto py-3'>
          <a href='tel:+918778517060' className='help-type-link'>
            <HelpType label='Call' text='+91 8778517060' iconPath='../../../../../images/help-modal/call-icon.svg' />
          </a>
          <a href='mailto:reach@hackerkid.org' className='help-type-link'>
            <HelpType label='Email' text='reach@hackerkid.org' iconPath='../../../../../images/help-modal/email-icon.svg' />
          </a>
          {/* <HelpType text='Open chat now'
          iconPath='../../../../../images/help-modal/chat-icon.svg' /> */}
          {/* <a href='#' className='help-type-link'>
            <HelpType text='FAQ' iconPath='../../../../../images/help-modal/faq-icon.svg' />
          </a> */}
        </div>
    </Modal>
);

export default HelpModal;
