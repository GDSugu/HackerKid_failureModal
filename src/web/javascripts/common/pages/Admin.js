import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import '../../../stylesheets/common/pages/admin/style.scss';
import { $, pageInit } from '../framework';
import { validateField } from '../../../../hooks/common/framework';

const adminManager = {};

const Admin = () => {
  pageInit('admin-page-container', 'Admin');
  const isPageMounted = useRef(true);

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
      countryCode,
      paymentId: paymentId.value,
    };

    console.log(obj);
  };

  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    adminManager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });

    return () => {
      isPageMounted.current = false;
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
    <div className="loader"></div>
  </>;
};

export default Admin;
