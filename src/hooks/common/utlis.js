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

export default getPlatform;

export {
  getDevice,
};
