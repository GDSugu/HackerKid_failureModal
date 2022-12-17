import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';

const About = () => {
  pageInit('about-container', 'About');
  return (
    <div>
      <h1>
        <FormattedMessage
          description = "Page description"
          defaultMessage = "This is about page"
        />
      </h1>
      <nav>
        <Link to='/'>
          <FormattedMessage
            description = "Link description"
            defaultMessage = "Go to Index"
          />
        </Link>
      </nav>
    </div>
  );
};

export default About;
