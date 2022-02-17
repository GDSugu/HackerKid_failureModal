const fontFamily = 'Averia Sans Libre';

const heading1 = {
  fontFamliy,
  fontStyle: 'normal',
  fontWeight: bold,
  fontSize: 48,
};

const heading2 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 40,
}

const heading3 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 32,
}

const heading4 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 28,
}

const heading5 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 24,
}

const heading6 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 20,
}

const mobileTypography = {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  subtitle1: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle2: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  body: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  },
  bodyBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
  },
  caption: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
  },
  overline: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
  }
};

const webTypography = {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  subtitle1: heading6,
  subtitle2:{
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
  },
  bodyBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
  },
  captionBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  caption: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  overline: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  }
}


module.exports = {
  mobileTypography, webTypography
}
