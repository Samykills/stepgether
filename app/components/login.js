import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthConstants} from '../constants';

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: AuthConstants.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const onSignIn = async () => {
    setIsDisabled(true);
    const userInfo = await google_SignIn();
    if (userInfo) {
      const {idToken, accessToken} = userInfo;
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } else {
      setIsDisabled(false);
    }
  };

  let appleButton = null;
  if (Platform.OS == 'ios' && parseInt(Platform.Version) >= '13') {
    appleButton = <Text>apple</Text>;
  }

  return (
    <View style={[styles.container]}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignIn}
        disabled={isDisabled}
      />
      {appleButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const google_SignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
    return null;
  }
};

export default Login;
