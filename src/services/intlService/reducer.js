import * as actionTypes from './actionTypes';
import { init } from './helper';

const initialState = {
  locale: init(),
  isLocaleRefreshing: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INTL_SERVICE_SET_LOCALE_REQUEST:
      return { ...state, isLocaleRefreshing: true };
    case actionTypes.INTL_SERVICE_SET_LOCALE_SUCCESS:
      return { ...state, isLocaleRefreshing: false, error: null, locale: action.locale };
    case actionTypes.INTL_SERVICE_SET_LOCALE_FAILURE:
      return { ...state, isLocaleRefreshing: false, error: action.error };
    default:
      return state;
  }
}
