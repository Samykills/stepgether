import {observable, action} from 'mobx';
import RouterStore from './routerStore';
import SoundPlayer from 'react-native-sound-player';
SoundPlayer.loadSoundFile('tick', 'mp3');

class TabBarStore {
  @observable currentScene = 'tab1';

  @action setCurrentScene = () => {
    let routeName = RouterStore.currentRoute;
    if (routeName) {
      SoundPlayer.play();
      this.currentScene = routeName;
    }
  };
}

export default new TabBarStore();
