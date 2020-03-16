import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = () => (
  <View style={[styles.container]}>
    <LottieView
      loop={true}
      autoPlay={true}
      cacheStrategy={'strong'}
      source={require('../resources/animations/groove_walk.json')}
      hardwareAccelerationAndroid={true}
      style={[styles.lottieViewStyle]}
    />
    <Text style={[styles.textStyle]}>Stepgether</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lottieViewStyle: {
    width: 200,
    height: 200,
  },
});

export default Splash;
