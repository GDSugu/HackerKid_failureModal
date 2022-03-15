import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import Header from '../components/loginHeader/Header';

const Register = () => {
  pageInit('register-container', 'Register');

  return (
    <>
      <Header />
    </>
  );
};

export default Register;
