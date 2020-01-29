import {authorize, refresh} from 'react-native-app-auth';
import AuthStore from '../stores/authStore';

const CLIENT_ID = '22BJ3K';
const SECRET_KEY = '93be47fbbf6acd31b62fc5905eec6bfa';

const auth_config = {
  clientId: CLIENT_ID,
  clientSecret: SECRET_KEY,
  redirectUrl: 'stepgether://fitbit', //note: path is required
  scopes: ['activity', 'sleep', 'profile'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

export const Fitbit_Init = async () => {
  const fitBitAccessObj = await AuthStore.getFitbitAccessToken();
  if (!fitBitAccessObj) {
    const token = await authorize(auth_config);
    AuthStore.setFitbitAccessToken(token);
  } else {
    const token = await refresh(auth_config, {
      refreshToken: fitBitAccessObj.refreshToken,
    });
    AuthStore.setFitbitAccessToken(token);
  }
};

const fitbitApi = url => {
  const userId = AuthStore.fitbitApiAccessToken.tokenAdditionalParameters
    ? AuthStore.fitbitApiAccessToken.tokenAdditionalParameters.user_id
    : AuthStore.fitbitApiAccessToken.additionalParameters.user_id;
  const fitbitUrl = url.replace('$userId', userId);
  return fetch(fitbitUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${AuthStore.fitbitApiAccessToken.accessToken}`,
    },
  });
};

/**
 * Get user activity for a certain date
 * @param {Date} date == null then takes current date.
 */
export const Fitbit_UserActivity = date => {
  const queryDate = date
    ? date.toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  const url = `https://api.fitbit.com/1/user/$userId/activities/date/${queryDate}.json`;
  //TO-DO save the result to our server.
  return fitbitApi(url).then(res => res.json());
};

export const Fitbit_UserProfile = () => {
  const url = `https://api.fitbit.com/1/user/$userId/profile.json`;
  return fitbitApi(url).then(res => res.json());
};

// // Revoke token
// await revoke(config, {
//   tokenToRevoke: refreshedState.refreshToken,
//   includeBasicAuth: true,
// });
