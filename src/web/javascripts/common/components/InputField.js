import React from 'react';
import { FormattedMessage } from 'react-intl';

const InputField = () => (
  <div className ="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">
    <FormattedMessage
        defaultMessage = "Email Address"
      />
    </label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
  </div>
);

export default InputField;
