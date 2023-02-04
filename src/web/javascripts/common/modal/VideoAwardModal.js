import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../components/Modal';
import Img from '../components/Img';

const SuccessModalComponent = ({
  coinsEarned = 0, xpEarned = 0, playNext, showModal,
}) => <>
     <Modal
      modalClass={'successModal'}
      customClass={'curved'}
      modalVisible={showModal}>
        <div className='d-flex justify-content-center mt-3'>
        <div className='mr-3'>
          <FormattedMessage
          defaultMessage={'{coins}'}
          values={{ coins: coinsEarned }}/>
        <Img
        className='ml-1'
        src='../../../images/courses/Coins.png'/>
       </div>

        <div>
        <FormattedMessage
          defaultMessage={'{xp}'}
          values={{ xp: xpEarned }}/>
        <Img
         className='ml-1'
        src='../../../images/courses/XP.png'/>
        </div>
        </div>

        <div className='d-flex align-items-center mt-3 d-flex flex-column'>
        <FormattedMessage
          defaultMessage={'Congrats! You have Received {coins} Coins and {xp} XP'}
          values={{ coins: coinsEarned, xp: xpEarned }}/>
          <button className='btn btn-primary mt-3' onClick={playNext}>
                              <div className="d-flex justify-content-between align-items-center">
                                <FormattedMessage
                                  defaultMessage={'Play next'}
                                  description={'Play next button'}
                                />
                                <i className="fas fa-angle-right "></i>
                              </div>
                            </button>
        </div>

          </Modal>

</>;

export default SuccessModalComponent;
