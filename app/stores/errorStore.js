import {observable, action} from 'mobx';

class ErrorStore {
  error;
  @observable showErrorView = false;
  @action setError = error => {
    this.error = error;
    if (error.showErrorView) {
      this.showErrorView = true;
    }
  };
}

export default new ErrorStore();
