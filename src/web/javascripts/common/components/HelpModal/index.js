import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import '../../../../stylesheets/common/sass/components/_help-modal.scss';

const HelpType = ({ text, iconPath, label = '' }) => (
    <div className='help-type-container'>
    <div className='text'>
      {
        label && <label className='body-bold'>
        <FormattedMessage defaultMessage='{label}' description='help type label' values={{ label }}/>
      </label>
      }
        <p className='subtitle1 m-0'>
        <FormattedMessage defaultMessage='{text}' description='help type text' values={{ text }}/>
        </p>
      </div>
      <img src={ iconPath} className='icon' alt='help-type-icon'></img>
    </div>
);

const HelpModal = () => (
    <Modal customClass='help-modal' modalTitle='Help' options='hide'>
    <a href='tel:+919876543221'>
      <HelpType label='Call' text='9876543221' iconPath='../../../../../images/help-modal/call-icon.svg' />
    </a>
    <a href='mailto:help@hackerkid.org'>
      <HelpType label='Email' text='help@hackerkid.org' iconPath='../../../../../images/help-modal/email-icon.svg' />
    </a>
      <HelpType text='Open chat now' iconPath='../../../../../images/help-modal/chat-icon.svg' />
      <HelpType text='FAQ' iconPath='../../../../../images/help-modal/faq-icon.svg' />
    </Modal>
);

export default HelpModal;
