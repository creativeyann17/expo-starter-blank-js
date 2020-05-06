import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import * as actionTypes from './actionTypes';

const initialState = {
  isKeepAwake: false,
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
