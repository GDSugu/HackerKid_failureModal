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

export default getPlatform;

export {
  debounce,
  throttle,
  getDevice,
  debounce1,
};
