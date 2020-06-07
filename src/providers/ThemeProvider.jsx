import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';

import * as themeSelectors from '../services/themeService/selectors';
import { debug } from '../utils/logger';

const mapStateToProps = (state) => {
  return {
    theme: themeSelectors.theme(state),
    systemColorScheme: themeSelectors.systemColorScheme(state),
  };
};

const ThemeProvider = (props) => {
  debug('ThemeProvider theme:', props.theme);
  debug('ThemeProvider systemColorScheme:', props.systemColorScheme);

  return <PaperProvider theme={props.theme}>{props.children}</PaperProvider>;
};

export default connect(mapStateToProps)(ThemeProvider);
