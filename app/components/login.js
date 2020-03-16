import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {inject} from 'mobx-react';

const Login = ({AuthStore}) => {
  const {setUserToken} = AuthStore;

  return (
    <View style={[styles.container]}>
      <Button
        title="Login via Google"
        onPress={() => {
          setUserToken('dummyToken123123123');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default inject('AuthStore')(Login);
