import React from 'react';
import { themes, font } from './config';

const ThemeContext = React.createContext({
  currentTheme: 'light',
  theme: themes.light,
  font,
  toggleTheme: () => {},
});

export default ThemeContext;
