import * as actionTypes from './actionTypes';

export const setKeepAwake = (isKeepAwake) => {
  return {
    type: actionTypes.AWAKE_SERVICE_SET_KEEP_AWAKE,
    isKeepAwake,
  };
};
