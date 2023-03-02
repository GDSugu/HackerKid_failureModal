import jBox from 'jbox';
import 'jbox/dist/jBox.all.css';
import { $ } from '../../framework';

const showNotificationAlert = (content, status = 'success', options = {}) => {
  const jboxOptions = {
    content,
    showCountdown: true,
    delayOnHover: true,
    animation: 'tada',
    offset: {
      y: 50,
    },
    responsiveWidth: true,
    ...options,
  };

  // eslint-disable-next-line no-new, new-cap
  new jBox('Notice', jboxOptions);
  let bgColor = '#09e176';
  switch (status) {
    case 'success': bgColor = '#09e176'; break;
    case 'error': bgColor = '#ff4136'; break;
    default: break;
  }

  $('.jBox-Notice .jBox-content')
    .css({
      'background-color': bgColor,
      color: '#ffffff',
    });
};

export default null;

export {
  showNotificationAlert,
};
