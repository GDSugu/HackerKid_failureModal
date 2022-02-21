const fontFamily = 'Averia Sans Libre';

const heading1 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 48,
};

const heading2 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 40,
};

const heading3 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 32,
};

const heading4 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 28,
};

const heading5 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 24,
};

const heading6 = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 20,
};

const mobileTypography = {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  subtitle1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  body: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  },
  bodyBold: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
  },
  caption: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
  },
  overline: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
  },
};

const webTypography = {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  subtitle1: heading6,
  subtitle2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
  },
  bodyBold: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
  },
  captionBold: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  caption: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  overline: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  },
};

module.exports = {
  fontFamily,
  mobileTypography,
  webTypography,
};
