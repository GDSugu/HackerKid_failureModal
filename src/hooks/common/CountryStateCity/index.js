import React from 'react';
import post from '../framework';

const useCountryStateCity = ({ isPageMounted }) => {
  const [locationState, setLocationState] = React.useState({
    status: true,
    countryResponse: {
      status: false,
      countries: false,
    },
    stateResponse: {
      status: false,
      states: false,
    },
    cityResponse: {
      status: false,
      cities: false,
    },
  });

  const fetchLocation = async ({ locationType, country = false, state = false }) => {
    const payload = {};

    switch (locationType) {
      case 'country':
        payload.type = 'getAllCountries';
        break;
      case 'state':
        payload.type = 'getStatesByCountry';
        payload.country = country;
        break;
      case 'city':
        payload.type = 'getCitiesByState';
        payload.country = country;
        payload.state = state;
        break;
      default: break;
    }

    return post(payload, '/common/countryStateCity/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setLocationState((prevState) => ({
              ...prevState,
              status: 'access_denied',
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setLocationState((prevState) => ({
              ...prevState,
              [`${locationType}Response`]: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  return {
    state: locationState,
    setState: setLocationState,
    static: {
      fetchLocation,
    },
  };
};

export default null;

export {
  useCountryStateCity,
};
