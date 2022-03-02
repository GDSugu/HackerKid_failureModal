import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../stylesheets/signin/style.scss';

const Signin = () => (
  <div className='signin-form'>
    <div className='px-3 pt-2'>
      <img src='../../../../images/signin/signin-form-svg.svg' className='signin-form-svg'></img>
      <div className="mb-3">
        <label htmlFor="username" className="form-label overline-bold">
          <FormattedMessage
              defaultMessage = "Username"
            />
        </label>
        <input className='form-control' type='text' name='username' id='username' placeholder='Username'/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label overline-bold">
        <FormattedMessage
            defaultMessage = "Password"
          />
        </label>
        <input className='form-control' type='password' name='password' id='password' placeholder='Password'/>
      </div>
      <p className='overline text-center'>
        <FormattedMessage
          defaultMessage = "Forgot Password?"
        />
      </p>
      <div className='login-btn-and-google-btn'>
        <button className='btn btn-outline-secondary sign-in-with-google-btn'>
          <span className='overline-bold'>
            <FormattedMessage
              defaultMessage="Sign in with Google"
            />
          </span>
        </button>
        <button className='btn btn-primary login-btn'>
          <span className='overline-bold'>
            <FormattedMessage
              defaultMessage="Login"
            />
          </span>
        </button>
      </div>
    </div>
    <button className='btn btn-block create-account-btn'>
      <span className='overline-bold'>
          <FormattedMessage
            defaultMessage="Create a New Account"
          />
        </span>
    </button>
  </div>
);

export default Signin;
