import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const About = () => (
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

export default About;
