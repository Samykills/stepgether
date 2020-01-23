import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import {FITBIT_AUTH_COOKIE} from './healthKitConstants';

const CLIENT_ID = '22BJ3K';
const SECRET_KEY = '93be47fbbf6acd31b62fc5905eec6bfa';

export const Fitbit_Init = async () => {
  // Fitbit_OAuth(CLIENT_ID, Fitbit_GetData);
  const token = await authorize(auth_config);
  // AsyncStorage.setItem(FITBIT_AUTH_COOKIE, token);
  Fitbit_UserProfile(token);
};

export const Fitbit_UserProfile = token => {
  const url = `https://api.fitbit.com/1/user/${token.tokenAdditionalParameters.user_id}/profile.json`;
  fetch(url, {
    Authorization: `Bearer ${token.accessToken}`,
  })
    .then(res => res.json())
    .then(res => {
      debugger;
    });
};

const auth_config = {
  clientId: CLIENT_ID,
  clientSecret: SECRET_KEY,
  redirectUrl: 'stepgether://fitbit', //note: path is required
  scopes: ['activity', 'sleep','profile'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

// Log in to get an authentication token
// const authState = await ;

// // Refresh token
// const refreshedState = await refresh(config, {
//   refreshToken: authState.refreshToken,
// });

// // Revoke token
// await revoke(config, {
//   tokenToRevoke: refreshedState.refreshToken,
//   includeBasicAuth: true,
// });
