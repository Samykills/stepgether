import {observable, computed, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthConstants} from '../constants';
import ErrorStore from './errorStore';
class AuthStore {
  @observable userToken;
  @observable selectedDeviceToken;
  @observable isLoading = true; //only use it for appRouter.js
  constructor() {
    this.loadDataFromStorage();
  }

  loadDataFromStorage = async () => {
    try {
      console.warn('async call start');
      this.userToken = await AsyncStorage.getItem(
        AuthConstants.USER_SESSION_STORE,
      );
      this.selectedDeviceToken = await AsyncStorage.getItem(
        AuthConstants.USER_SELECTED_DEVICE,
      );
      // throw 'error aagaya';
      console.warn('async call end');
    } catch (e) {
      // ErrorStore.setError({showErrorView: true, error: e});
      console.warn('async Storage fuckedUp');
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
}

export default new AuthStore();
