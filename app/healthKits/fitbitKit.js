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
  debugger;

  const fitbitUrl = url.replace(
    '$userId',
    AuthStore.fitbitApiAccessToken.tokenAdditionalParameters.user_id,
  );
  debugger;
  //TO-DO fix this some problem here
  return fetch(fitbitUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${AuthStore.fitbitApiAccessToken.accessToken}`,
    },
  });
};

export const Fitbit_UserActivity = token => {
  const url = `https://api.fitbit.com/1/user/$userId/activities/date/2020-01-27.json`;
  return fitbitApi(url).then(res => res.json());
};

export const Fitbit_UserProfile = token => {
  const url = `https://api.fitbit.com/1/user/$userId/profile.json`;
  fitbitApi(url)
    .then(res => {
      if (res.status == 401) {
      }
      return res.json();
    })
    .then(res => {
      debugger;
    });
};

// Log in to get an authentication token
// const authState = await ;

// // Refresh token
// const refreshedState = await refresh(auth_config, {
//   refreshToken: authState.refreshToken,
// });

// // Revoke token
// await revoke(config, {
//   tokenToRevoke: refreshedState.refreshToken,
//   includeBasicAuth: true,
// });
