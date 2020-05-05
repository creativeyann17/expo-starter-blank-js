import * as actionTypes from './actionTypes';

export const setLocaleRequest = (locale) => {
  return {
    type: actionTypes.INTL_SERVICE_SET_LOCALE_REQUEST,
    locale,
  };
};

export const setLocaleSuccess = (locale) => {
  return {
    type: actionTypes.INTL_SERVICE_SET_LOCALE_SUCCESS,
    locale,
  };
};

export const setLocaleFailure = (locale, error) => {
  return {
    type: actionTypes.INTL_SERVICE_SET_LOCALE_FAILURE,
    locale,
    error,
  };
};
