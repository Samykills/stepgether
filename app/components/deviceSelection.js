import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';
import {Fitbit_Init} from '../healthKits/fitbitKit';
import {DeviceConstants} from '../constants';
const DeviceSelection = ({AuthStore}) => {
  const {setSelectedDeviceToken} = AuthStore;
  const fitbitInit = async () => {
    await Fitbit_Init();
    setSelectedDeviceToken(DeviceConstants.DEVICE_FITBIT);
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Button
        title={'FitBit'}
        accessibilityLabel={'Fitbit'}
        onPress={fitbitInit}
      />
      <Button
        title={'Apple Watch'}
        accessibilityLabel={'Apple Watch'}
        onPress={() =>
          setSelectedDeviceToken(DeviceConstants.DEVICE_APPLE_WATCH)
        }
      />
    </View>
  );
};

export default inject('AuthStore')(DeviceSelection);
