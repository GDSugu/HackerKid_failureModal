import React from 'react';
import { FormattedMessage } from 'react-intl';
import InputField from '../components/InputField';
import '../../../stylesheets/signin/style.scss';

const Signin = () => (
  <div>
    <h1>
      <FormattedMessage
        defaultMessage = "Signin page"
      />
    </h1>
    <InputField></InputField>
  </div>
);

export default Signin;
