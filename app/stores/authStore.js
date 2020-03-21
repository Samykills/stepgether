import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthConstants, FitbitConstants, DeviceConstants} from '../constants';
import ErrorStore from './errorStore';
import {Fitbit_Init} from '../healthKits/fitbitKit';
import auth from '@react-native-firebase/auth';

class AuthStore {
  @observable userToken;
  @observable selectedDeviceToken;
  @observable isLoading = true; //only use it for appRouter.js
  fitbitApiAccessToken = '';

  unSubscribeUser = auth().onAuthStateChanged(user => {
    if (user) {
      this.userToken = true;
    } else {
      this.userToken = false;
    }
  });

  constructor() {
    this.loadDataFromStorage();
  }

  loadDataFromStorage = async () => {
    try {
      this.userToken = await AsyncStorage.getItem(
        AuthConstants.USER_SESSION_STORE,
      );
      this.selectedDeviceToken = await AsyncStorage.getItem(
        AuthConstants.USER_SELECTED_DEVICE,
      );
      switch (this.selectedDeviceToken) {
        case DeviceConstants.DEVICE_FITBIT:
          await Fitbit_Init();
          // this.selectedDeviceToken = selectedDeviceToken;
          break;
        case DeviceConstants.DEVICE_APPLE_WATCH:
          // this.selectedDeviceToken = selectedDeviceToken;
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
      ErrorStore.setError({showErrorView: true, error: e});
    }
    this.isLoading = false;
  };

  @action setSelectedDeviceToken = deviceType => {
    this.selectedDeviceToken = deviceType;
    AsyncStorage.setItem(AuthConstants.USER_SELECTED_DEVICE, deviceType);
  };

  @action unSetUserToken = async () => {
    await auth().signOut();
  };

  @action unSetSelectedDeviceToken = () => {
    this.selectedDeviceToken = undefined;
    AsyncStorage.removeItem(AuthConstants.USER_SELECTED_DEVICE);
  };

  @action setFitbitAccessToken = token => {
    this.fitbitApiAccessToken = token;
    AsyncStorage.setItem(
      FitbitConstants.FITBIT_AUTH_COOKIE,
      JSON.stringify(token),
    );
  };

  getFitbitAccessToken = async () => {
    const token = await AsyncStorage.getItem(
      FitbitConstants.FITBIT_AUTH_COOKIE,
    );
    if (token) {
      return JSON.parse(token);
    }
    return null;
  };
}

export default new AuthStore();
