import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import AccountNavBar from '../AccountNavBar';

const MoreAccountNavBar = () => (<>
  <AccountNavBar
    backNavigationUrl='/more'
    NavItems={(screen) => <>
      {
        [{
          link: '/certificates',
          label: 'Certificates',
          description: 'Navigation to Certificates',
        },
        {
          link: '/awards',
          label: 'Awards',
          description: 'Navigation to Awards',
        },
        // {
        //   link: '/collectibles',
        //   label: 'Collectibles',
        //   description: 'Navigation to Collectibles',
        // },
        ].map(({ label, link, description }, idx) => <div key={idx} className={`account-nav-item ${link.replace(/\//g, '') === screen ? 'active' : ''}`}>
          <Link to={link}>
            <FormattedMessage
              defaultMessage={'{label}'}
              description={'{description}'}
              values={{
                label,
                description,
              }}
            />
          </Link>
        </div>)
      }
    </>}
  />
</>);

export default MoreAccountNavBar;
