import { Appearance } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, Colors } from 'react-native-paper';

import { debug } from '../../utils/logger';
import * as actionTypes from './actionTypes';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue700,
    accent: Colors.blue500,
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.blue700,
    accent: Colors.blue500,
  },
};

const systemColorScheme = Appearance.getColorScheme();

debug('Init systemColorScheme:', systemColorScheme);

const initialState = {
  systemColorScheme,
  theme: systemColorScheme === 'dark' ? darkTheme : defaultTheme,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.THEME_SERVICE_SET_DARK_MODE:
      return { ...state, theme: action.isDarkMode ? darkTheme : defaultTheme };
    default:
      return state;
  }
}
