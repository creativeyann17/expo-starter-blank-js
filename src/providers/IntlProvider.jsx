import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as intlSelectors from '../services/intlService/selectors';
import { debug } from '../utils/logger';

const mapStateToProps = (state) => {
  return {
    locale: intlSelectors.locale(state),
  };
};

const I18nLayout = (props) => {
  debug('Current locale:', props.locale);

  return <View key={props.locale}>{props.children}</View>;
};

export default connect(mapStateToProps)(I18nLayout);
