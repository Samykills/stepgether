/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';
import {Fitbit_UserActivity} from '../healthKits/fitbitKit';

const Feed = ({AuthStore, navigation}) => {
  const {unSetUserToken, unSetSelectedDeviceToken} = AuthStore;
  const [stepCount, setStepCount] = useState(0);
  useFocusEffect(() => {
    Platform.OS === 'ios' ? Apple_GetSteps() : fitBitActivity();
  }, []);

  const fitBitActivity = async () => {
    const activity = await Fitbit_UserActivity();
    debugger;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Button
        title={'Select Device'}
        onPress={() => navigation.navigate('deviceSelection2')}
      />
      <Button title={'Reset Device'} onPress={unSetSelectedDeviceToken} />
      <Button title={'Logout'} onPress={unSetUserToken} />
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Feed);
