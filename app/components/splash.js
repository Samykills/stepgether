import React from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <LottieView
      loop={true}
      autoPlay={true}
      cacheStrategy={'strong'}
      source={require('../resources/animations/groove_walk.json')}
      hardwareAccelerationAndroid={true}
      style={{width: 200, height: 200}}
    />
    <Text style={{fontSize: 24, fontWeight: 'bold'}}>Stepgether</Text>
  </View>
);

export default Splash;
