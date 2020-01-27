import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthConstants, FitbitConstants, DeviceConstants} from '../constants';
import ErrorStore from './errorStore';
import {Fitbit_Init} from '../healthKits/fitbitKit';
class AuthStore {
  @observable userToken;
  @observable selectedDeviceToken;
  @observable isLoading = true; //only use it for appRouter.js
  fitbitApiAccessToken='';

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
      ErrorStore.setError({showErrorView: true, error: e});
    }
    this.isLoading = false;
  };

  @action setUserToken = token => {
    this.userToken = token;
    AsyncStorage.setItem(AuthConstants.USER_SESSION_STORE, token);
  };

  @action setSelectedDeviceToken = deviceType => {
    this.selectedDeviceToken = deviceType;
    AsyncStorage.setItem(AuthConstants.USER_SELECTED_DEVICE, deviceType);
  };

  @action unSetUserToken = () => {
    this.userToken = undefined;
    AsyncStorage.removeItem(AuthConstants.USER_SESSION_STORE);
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
