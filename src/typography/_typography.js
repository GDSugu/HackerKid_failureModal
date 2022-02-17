const fontFamily = 'Averia Sans Libre';

const heading1 = {
  fontFamliy,
  fontStyle: 'normal',
  fontWeight: bold,
  fontSize: '48px',
};

const heading2 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '40px',
}

const heading3 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '32px',
}

const heading4 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '28px',
}

const heading5 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '24px',
}

const heading6 = {
  fontFamily,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
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
    fontSize: '16px',
  },
  subtitle2: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
  },
  body: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
  },
  bodyBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  caption: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
  },
  overline: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
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
    fontSize: '20px',
  },
  bodyBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  body: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
  },
  captionBold: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  caption: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
  },
  overline: {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
  }
}


module.exports = {
  mobileTypography, webTypography
}
