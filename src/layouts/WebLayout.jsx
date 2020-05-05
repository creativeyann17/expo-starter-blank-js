import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Timer from '../components/Timer';

const WebLayout = () => {
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
  container: { flexDirection: 'row' },
});

export default WebLayout;
