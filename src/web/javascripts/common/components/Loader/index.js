import React from 'react';
import $ from 'jquery';
import '../../../../stylesheets/common/sass/components/_loading.scss';

const Loader = () => {
  React.useEffect(() => {
    $('.loader').show();

    return () => {
      $('.loader').hide();
    };
  });

  return <>
    <div id="loader"></div>
  </>;
};

export default Loader;
