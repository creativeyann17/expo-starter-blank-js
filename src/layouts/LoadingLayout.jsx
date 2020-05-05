import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';

const LoadingLayout = ({ theme }) => {
  return <View style={{ backgroundColor: theme.colors.background, flex: 1 }} />;
};

export default withTheme(LoadingLayout);
