/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';

const Feed = ({AuthStore, navigation}) => {
  const {unSetUserToken, unSetSelectedDeviceToken} = AuthStore;
  useFocusEffect(() => {
    Platform.OS === 'ios' ? Apple_GetSteps() : null;
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Button
        title={'Select Device'}
        onPress={() => navigation.navigate('deviceSelection')}
      />
      <Button title={'Reset Device'} onPress={unSetSelectedDeviceToken} />
      <Button title={'Logout'} onPress={unSetUserToken} />
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Feed);
