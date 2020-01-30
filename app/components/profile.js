import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Fitbit_UserActivity} from '../healthKits/fitbitKit';
import {inject} from 'mobx-react';
import {DeviceConstants} from '../constants';

const Profile = ({AuthStore}) => {
  const [activity, setActivity] = useState(null);
  const {selectedDeviceToken} = AuthStore;

  useEffect(() => {
    const fitBitActivity = async () => {
      const activity = await Fitbit_UserActivity();
      setActivity(activity);
    };
    switch (selectedDeviceToken) {
      case DeviceConstants.DEVICE_FITBIT:
        fitBitActivity();
        break;
      case DeviceConstants.DEVICE_APPLE_WATCH:
        Apple_GetSteps();
        break;
      default:
        break;
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 32}}>Hi User,</Text>
      </View>
      {/* <View style={{paddingLeft: 20}}>
        <Text style={{fontSize: 12, textDecorationLine: 'underline'}}>
          Analytics
        </Text>
      </View> */}
      <View style={{paddingLeft: 30, height: 200, backgroundColor: 'red'}}>
        <View>
          <Text>steps</Text>
        </View>
        <Text>{JSON.stringify(activity)}</Text>
      </View>
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Profile);
