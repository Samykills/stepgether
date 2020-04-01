import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';
import {Fitbit_Init} from '../healthKits/fitbitKit';
import {DeviceConstants} from '../constants';
import {saveSelectedDeviceToken} from '../functionsApi/firebaseCloudFunctions';

const DeviceSelection = ({AuthStore}) => {
  const {setSelectedDeviceToken} = AuthStore;
  const fitbitInit = async () => {
    await Fitbit_Init();
    saveSelectedDeviceToken(DeviceConstants.DEVICE_FITBIT);
    setSelectedDeviceToken(DeviceConstants.DEVICE_FITBIT);
  };

  const appleWatchInit = () => {
    saveSelectedDeviceToken(DeviceConstants.DEVICE_FITBIT);
    setSelectedDeviceToken(DeviceConstants.DEVICE_APPLE_WATCH);
  };
  return (
    <View style={[styles.container]}>
      <Button
        title={'FitBit'}
        accessibilityLabel={'Fitbit'}
        onPress={fitbitInit}
      />
      <Button
        title={'Apple Watch'}
        accessibilityLabel={'Apple Watch'}
        onPress={appleWatchInit}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-around', alignItems: 'center'},
});
export default inject('AuthStore')(DeviceSelection);
