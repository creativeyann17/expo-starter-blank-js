// import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import Timer from '../components/Timer';

const MobileLayout = () => {
  return (
    <View>
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
    flexDirection: 'row',
  },
});

export default MobileLayout;
