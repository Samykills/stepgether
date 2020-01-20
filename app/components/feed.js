/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, Button, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Fitbit_Init} from '../healthKits/fitbitKit';

const Feed = () => {
  useFocusEffect(() => {
    Platform.OS === 'ios' ? Apple_GetSteps() : null;
  }, []);

  const onClick = () => {
    Fitbit_Init();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Feeds</Text>
      <Button onPress={onClick} title={'fitbit'} />
      <Button onPress={onClick} title={'fitbit'} />
    </SafeAreaView>
  );
};
export default Feed;
