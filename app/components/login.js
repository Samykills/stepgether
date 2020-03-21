import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthConstants} from '../constants';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';
const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: AuthConstants.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const onGoogleSignInButtonPress = async () => {
    setIsDisabled(true);
    const userInfo = await googleSignIn();
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

  const onAppleSignInButtonPress = async () => {
    setIsDisabled(true);
    const userInfo = await appleSignIn();
    if (userInfo) {
      const {identityToken, nonce} = userInfo;
      // can be null in some scenarios
      if (identityToken) {
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );
        await auth().signInWithCredential(appleCredential);
      }
    } else {
      setIsDisabled(false);
    }
  };

  let appleSignInButton = null;
  if (Platform.OS == 'ios' && parseInt(Platform.Version) >= '13') {
    appleSignInButton = (
      <AppleButton
        style={[styles.appleButton]}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={onAppleSignInButtonPress}
        // disabled={isDisabled}
      />
    );
  }

  return (
    <View style={[styles.container]}>
      <GoogleSigninButton
        style={[styles.googleButton]}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleSignInButtonPress}
        disabled={isDisabled}
      />
      {appleSignInButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  appleButton: {
    width: '80%',
    height: 45,
  },
  googleButton: {
    width: '80%',
    height: 50,
  },
});

const appleSignIn = async () => {
  // performs login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    return appleAuthRequestResponse;
  } catch (error) {
    if (error.code === AppleAuthError.CANCELED) {
    }
    if (error.code === AppleAuthError.FAILED) {
    }
    if (error.code === AppleAuthError.INVALID_RESPONSE) {
    }
    if (error.code === AppleAuthError.NOT_HANDLED) {
    }
    if (error.code === AppleAuthError.UNKNOWN) {
    }
    return null;
  }
};

const googleSignIn = async () => {
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
