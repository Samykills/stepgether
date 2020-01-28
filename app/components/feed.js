/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import {inject} from 'mobx-react';

const Feed = ({AuthStore, navigation}) => {
  const {unSetUserToken, unSetSelectedDeviceToken} = AuthStore;

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
