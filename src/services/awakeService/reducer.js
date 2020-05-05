import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import { debug } from '../../utils/logger';
import * as actionTypes from './actionTypes';

const initKeepAwake = true;

debug('Init keepAwake:', initKeepAwake);

const initialState = {
  isKeepAwake: initKeepAwake,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.AWAKE_SERVICE_SET_KEEP_AWAKE:
      if (action.initKeepAwake) {
        activateKeepAwake();
      } else {
        deactivateKeepAwake();
      }
      return { ...state, isKeepAwake: action.isKeepAwake };
    default:
      return state;
  }
}
