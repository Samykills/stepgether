import React from 'react';
import {View, Button} from 'react-native';
import {inject} from 'mobx-react';

const Login = ({AuthStore}) => {
  const {setUserToken} = AuthStore;

  return (
    <View style={{flex: 1}}>
      <Button
        title="Login via Google"
        onPress={() => {
          setUserToken('dummyToken123123123');
        }}
      />
    </View>
  );
};

export default inject('AuthStore')(Login);
