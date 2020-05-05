// import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';

import Header from '../components/Header';
import Timer from '../components/Timer';

const MobileLayout = ({ theme }) => {
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
    // marginTop: Constants.statusBarHeight, // 0 on web, I could use the same layout
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(MobileLayout);
