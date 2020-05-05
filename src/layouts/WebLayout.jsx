import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

import Header from '../components/Header';
import Timer from '../components/Timer';

const WebLayout = ({ theme }) => {
  return (
    <View style={[{ flex: 1 }, { backgroundColor: theme.colors.background }]}>
      <Header />
      <View style={styles.container}>
        <Timer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(WebLayout);
