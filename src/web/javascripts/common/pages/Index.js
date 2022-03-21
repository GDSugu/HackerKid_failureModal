import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';

const Index = () => {
  pageInit('landing-container');

  return (
    <div>
      <h1>
        <FormattedMessage
          description = "Page description"
          defaultMessage="This is index page"
        />
      </h1>
      <nav>
        <Link to='about'>
          <FormattedMessage
            description = "Link description"
            defaultMessage = "Go to About"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Index;
