const getPlatform = () => {
  if (window.document) {
    return 'web';
  }
  return 'app';
};

const getDevice = () => {
  const platform = getPlatform();
  let device = false;
  if (platform === 'web') {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      device = 'mobile';
    } else {
      device = 'desktop';
    }
  }
  return device;
};

const throttle = (fn, delay) => {
  let lastCall = 0;
  return ((...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    fn(...args);
  })();
};

const debounce = (fn, delay) => {
  let timer;
  return ((...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  })();
};

const debounce1 = (fn, delay) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const formatSeconds = (s) => {
  let time = '';
  let seconds = parseInt(s, 10);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;
  if (hours > 0) {
    time = `${hours} Hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) {
      time += ` ${minutes} Mins`;
    }
  } else if (minutes > 0) {
    time = `${minutes} Minute${minutes > 1 ? 's' : ''}`;
  } else if (seconds > 0) {
    time = `${seconds} Seconds`;
  } else {
    time = '0 Seconds';
  }
  return time;
};

export default getPlatform;

export {
  debounce,
  throttle,
  getDevice,
  debounce1,
  formatSeconds,
};
