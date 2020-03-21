import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {inject} from 'mobx-react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {firebase} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '90934680332-0qqllq8g7j3tl53tkq4r70kg9d217fnl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
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

const Login = ({AuthStore}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {setUserToken} = AuthStore;

  const onSignIn = async () => {
    setIsDisabled(true);
    const userInfo = await google_SignIn();
    if (userInfo) {
      const {idToken, accessToken} = userInfo;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      const userToken = await firebase.auth().signInWithCredential(credential);
      setUserToken(JSON.stringify(userToken.user));
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <View style={[styles.container]}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignIn}
        disabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default inject('AuthStore')(Login);
