const getPlatform = () => {
  if (window.document) {
    return 'web';
  }
  return 'app';
};

export default getPlatform;
