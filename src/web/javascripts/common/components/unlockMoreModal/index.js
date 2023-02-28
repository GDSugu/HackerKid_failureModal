import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../Modal';
import Img from '../Img';
import usePricing from '../../../../../hooks/pages/pricing';
import '../../../../stylesheets/common/sass/components/_unlockMoreModal.scss';
import { $, pathNavigator } from '../../framework';
import initSubscriptionPayment from '../../../../../hooks/common/payment';
import Razorpay from '../../../../partials/razorpay-script-header';

const initPayment = () => {
  $('#loader').show();
  Razorpay();
  initSubscriptionPayment({ subscriptionType: 'premium' }).then((res) => {
    $('#loader').hide();
    const orderRes = JSON.parse(res);
    if (orderRes.status === 'success') {
      $('.unlock-more-modal').modal('hide');
      const order = orderRes.orderDetails;
      // console.log(order);
      const options = {
        key: order.razorKeyId,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        notes: order.notes,
        order_id: order.id,
        prefill: {
          name: order.name,
          email: order.email,
          contact: order.phone,
        },
        handler(paymentResponse) {
          if (paymentResponse.razorpay_payment_id) {
            pathNavigator(
              'dashboard?payment=success',
            );
          }
        },
      };
      // console.log(options);
      const razorPayObj = new window.Razorpay(options);
      razorPayObj.open();
    } else if (orderRes.status === 'error' && orderRes.message === 'Access Denied') {
      window.sessionStorage.setItem('navigateTo', window.location.href);
      pathNavigator('register');
    }
  });
};

const UnlockMoreModal = () => {
  const isPageMounted = React.useRef(true);
  const { pricingDetails } = usePricing({ isPageMounted });
  const { subscriptionDetails } = pricingDetails;
  const planDetails = {};
  if (subscriptionDetails) {
    planDetails.premium = subscriptionDetails.find((item) => item.planType === 'premium');
  }
  console.log(planDetails);
return <>
     <Modal
      modalClass={'unlock-more-modal'}
      customClass={'curved'}
      modalVisible={false}>
        <div className='unlock-more-modal-contianer'>
          <div className='unlock-more-modal-header'>
          <h1><FormattedMessage
                defaultMessage={'Upgrade to'}
                description={'Upgrade to'}
              /> <span><FormattedMessage
              defaultMessage={'HackerKid Premium'}
              description={'HackerKid Premium'}
            /></span></h1>
          </div>
          <div className='unlock-more-modal-body'>
            <div className='unlock-more-modal-description'>
              <p> <FormattedMessage
                defaultMessage={'HackerKid Premium gives you full access to the platform features for a 1 year subscription. With exciting coding games, problems, gamified environments you have a lot you explore, play and learn,'}
                description={'Unlock more modal description'}
              /></p>
        </div>
        <div className='unlock-more-modal-pricing'>
          <h1><FormattedMessage
                defaultMessage={'₹{price}'}
                description={'Unlock more modal price'}
                values={{ price: planDetails.premium ? planDetails.premium?.priceDetails?.INR?.price : '' }}
              /><s><FormattedMessage
              defaultMessage={'₹5000'}
              description={'Unlock more modal from discount price price'}
            /></s></h1>
            <p><FormattedMessage
                defaultMessage={'(*Excluding GST)'}
                description={'Unlock more modal (*Excluding GST)'}
              /></p>
        </div>
        <div className='unlock-more-modal-features'>
          <div className='unlock-more-modal-features-header'>
            <p><FormattedMessage
                defaultMessage={'Premium Edition Features:'}
                description={'Unlock more modal features header'}
              /></p>
              </div>
              <div className='unlock-more-modal-features-container row'>
              <div className='unlock-more-modal-features-body col-6'>
                <div className='unlock-more-modal-features-body-item'>
                <i className="fas fa-check-circle"></i>
                  <p className='mb-0'>
                  <FormattedMessage
                defaultMessage={'Full Game Features Access'}
                description={'Unlock more modal features : Full Game Features Access'}
                  />
                  </p>
                  </div>
                  <div className='unlock-more-modal-features-body-item'>
                <i className="fas fa-check-circle"></i>
                  <p className='mb-0'>
                  <FormattedMessage
                defaultMessage={'Micro Degree Certificates'}
                description={'Unlock more modal features : Micro Degree Certificates'}
                  />
                  </p>
                  </div>
                  </div>
                  <div className='unlock-more-modal-features-body col-6'>
                  <div className='unlock-more-modal-features-body-item'>
                <i className="fas fa-check-circle"></i>
                  <p className='mb-0'>
                  <FormattedMessage
                defaultMessage={'Full Video Library'}
                description={'Unlock more modal features: Full Video Library'}
                  />
                  </p>
                  </div>
                  <div className='unlock-more-modal-features-body-item'>
                <i className="fas fa-check-circle"></i>
                  <p className='mb-0'>
                  <FormattedMessage
                defaultMessage={'and many more...'}
                description={'Unlock more modal features : and many more...'}
                  />
                  </p>
                  </div>
                  
                  </div>
                  </div>
                  </div>
                  <div className='unlock-more-modal-footer row'>
                    <div className='col-6'>
                    <button onClick={() => {
                      pathNavigator('pricing');
                    }} className='btn btn-outline-primary d-flex align-items-center w-100 justify-content-center'>
                    <p className='mb-0'>                      <FormattedMessage
                      defaultMessage={'Know More'}
                      description={'Unlock more modal Know button'}
                     /></p>

                  <i className="fas fa-angle-right ml-3"></i>

                    </button>
                    </div>
                    <div className='col-6'>
                    <button onClick={initPayment} className='btn btn-primary w-100'>
                    <p className='mb-0'>     
                      <FormattedMessage
                        defaultMessage={'Upgrade Now'}
                        description={'Unlock more modal upgrade button'}
                      /></p>
                    </button>
                    </div>

        </div>
        </div>
        </div>
      </Modal>

</>};

export default UnlockMoreModal;
