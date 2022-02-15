
const getPlatform = () => {
  if (window) {
    return 'web';
  }
  return 'app';
}

export {
  getPlatform,
};
