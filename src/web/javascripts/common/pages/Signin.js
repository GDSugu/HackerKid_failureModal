import React from 'react';
import { FormattedMessage } from 'react-intl';
import InputField from '../components/InputField';
import '../../../stylesheets/signin/style.scss';

const Signin = () => (
  <div className='signin-form'>
    <div>
      <label htmlFor="exampleFormControlInput1" className="form-label overline-bold">
      <FormattedMessage
          defaultMessage = "Email Address"
        />
      </label>
      <InputField type='email' placeHolder='Email Address'></InputField>
    </div>
    <div>
      <label htmlFor="exampleFormControlInput1" className="form-label overline-bold">
      <FormattedMessage
          defaultMessage = "Password"
        />
      </label>
      <InputField type='password' placeHolder='Password'></InputField>
    </div>
    <p className='overline text-center'>
      <FormattedMessage
        defaultMessage = "Forgot Password"
      />
    </p>
  </div>
);

export default Signin;
