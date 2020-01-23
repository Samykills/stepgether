import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';
import {Fitbit_Init} from '../healthKits/fitbitKit';

const DeviceSelection = ({AuthStore}) => {
  const {setSelectedDeviceToken} = AuthStore;
  const fitbitInit = () => {
    Fitbit_Init();
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Button
        title={'FitBit'}
        accessibilityLabel={'Fitbit'}
        onPress={() => {
          fitbitInit();
          setSelectedDeviceToken('Fitbit');
        }}
      />
      <Button
        title={'Apple Watch'}
        accessibilityLabel={'Apple Watch'}
        onPress={() => setSelectedDeviceToken('Apple Watch')}
      />
    </View>
  );
};

export default inject('AuthStore')(DeviceSelection);
