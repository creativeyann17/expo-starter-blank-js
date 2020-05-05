export const debug = (message, ...optionalParams) => {
  if (__DEV__) {
    console.log(message, optionalParams);
  }
};
