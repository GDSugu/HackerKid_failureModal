import { StyleSheet } from 'react-native';

const font = StyleSheet.create({
  regular: {
    fontFamily: 'Muli',
		fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Muli',
		fontWeight: 'bold',
  },
  xbold: {
  	fontFamily: 'Muli',
		fontWeight: 'bold',
  }
});

const themes = {
	dark: {
    primary: '#fff',
  },
  light: {
    primary: '#000',
  }
};

export {
	font,
	themes,
}
