import * as actionTypes from './actionTypes';

export const setDarkMode = (isDarkMode) => {
  return {
    type: actionTypes.THEME_SERVICE_SET_DARK_MODE,
    isDarkMode,
  };
};
