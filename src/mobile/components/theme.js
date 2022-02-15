import React from 'react';
import { themes } from './config';

const ThemeContext = React.createContext({
  currentTheme: 'light',
  theme: themes.light,
  toggleTheme: () => {},
});

export default ThemeContext;
