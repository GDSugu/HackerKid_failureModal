const getPlatform = () => {
  if (document) {
    return 'web';
  }
  return 'app';
};

export default getPlatform;
