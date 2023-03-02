import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

import '../../../stylesheets/common/pages/admin/style.scss';
import { $, pageInit, pathNavigator } from '../framework';
import { validateField } from '../../../../hooks/common/framework';
import { useAdmin } from '../../../../hooks/pages/admin';
import Modal from '../components/Modal';
import { showNotificationAlert } from '../Functions/notification';

// TODO: check admin in frontend for accessing admin page

const adminManager = {};

const ReloadModalContent = () => {
  const reload = () => window.location.reload();

  return <>
    <div className="reload-modal-content">
      <h4 className='reload-modal-title'>
        <FormattedMessage
          defaultMessage={'something went wrong'}
          description={'error message'}
        />
      </h4>
      <button type="button" className="btn btn-primary reload-modal-btn" onClick={reload}>
        <FormattedMessage
          defaultMessage={'Try again'}
          description={'try again button'}
        />
      </button>
    </div>
  </>;
};

const Admin = () => {
  pageInit('admin-page-container', 'Admin');
  const isPageMounted = useRef(true);
  const {
    static: {
      activateUser,
      getUserRole,
    },
  } = useAdmin();

  const reloadModalRef = useRef(null);

  const showReloadModal = () => reloadModalRef?.current?.show();
  const hideReloadModal = () => reloadModalRef?.current?.hide();

  const submitAction = () => {
    const phone = validateField('tel', $('#phone').val().trim());
    if (!phone.status) {
      $('#phone').addClass('is-invalid');
    } else {
      $('#phone').removeClass('is-invalid');
    }

    const paymentId = validateField('text', $('#paymentId').val().trim(), false, true);
    if (!paymentId.status) {
      $('#paymentId').addClass('is-invalid');
    } else {
      $('#paymentId').removeClass('is-invalid');
    }

    const countryCode = adminManager.telInput.getSelectedCountryData().dialCode;
    const obj = {
      phone: phone.value,
      countryCode: `+${countryCode}`,
      paymentId: paymentId.value,
    };

    $('#loader').show();

    activateUser(obj)
      .then((resp) => {
        if (isPageMounted.current) {
          $('#loader').hide();
          if (resp === 'access_denied') {
            showReloadModal();
          } else {
            const parsedResponse = JSON.parse(resp);
            if (parsedResponse.status === 'success') {
              showNotificationAlert('Activated Successfully', 'success');
            } else {
              // eslint-disable-next-line no-new, new-cap
              showNotificationAlert(parsedResponse.message, 'error');
            }
          }
        }
      });
  };

  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    adminManager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });

    getUserRole()
      .then((resp) => {
        if (isPageMounted.current) {
          if (resp === 'access_denied') {
            pathNavigator('login/');
          } else {
            const parsedResponse = JSON.parse(resp);
            if (parsedResponse.status === 'error') {
              showNotificationAlert(parsedResponse.message, 'error');
            } else if (parsedResponse.status === 'success') {
              if (parsedResponse?.userRole?.role !== 'admin') {
                pathNavigator('dashboard/');
              }
            }
          }
        }
      });

    return () => {
      isPageMounted.current = false;
      hideReloadModal();
      $('.backdrop').remove();
    };
  });

  return <>
    <div className="admin-container col-12 col-md-10 mx-auto">
      <div className="operation-container activate-subscription">
        <div className="col-12 col-md-10">
          <div className="operation-title">
            <h2>
              <FormattedMessage
                defaultMessage={'Activate Subscription'}
                description={'operation title'}
              />
            </h2>
          </div>
          <div className="operation-content-container">
            <div className="form-group">
              <div>
                <label htmlFor="phone">
                  <FormattedMessage
                    defaultMessage={'Phone'}
                    description={'phone title'}
                  />
                </label>
              </div>
              <input type="tel"
                className="form-control" name="phone" id="phone" aria-describedby="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="paymentId">
                <FormattedMessage
                  defaultMessage={'Payment Id'}
                  description={'payment id title'}
                />
              </label>
              <input type="text"
                className="form-control" name="paymentId" id="paymentId" aria-describedby="paymentId" />
            </div>
            <button type="button" className="btn btn-primary activateBtn" onClick={submitAction}>
              <FormattedMessage
                defaultMessage={'Activate'}
                description={'activate btn'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal
      ref={reloadModalRef}
      options={'hide'}
      modalClass={'admin-reload-modal'}
      customClass={'curved'}
      header={<></>}
    >
      <ReloadModalContent />
    </Modal>
    <div id="loader"></div>
  </>;
};

export default Admin;
