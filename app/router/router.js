import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {inject, observer} from 'mobx-react';
import ErrorView from '../components/error';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Theme from '../theme/theme';
import {ThemeProvider} from 'react-native-elements';
import Group from '../components/group';
import Feed from '../components/feed/feed';
import Profile from '../components/profile';
import Splash from '../components/splash';
import Login from '../components/login';
import DeviceSelection from '../components/deviceSelection';
import CommentsView from '../components/feed/commentsView';
import SettingsView from '../components/settingsView';
import FriendsView from '../components/friendsView/friendsView';
import SocialProfile from '../components/friendsView/profile/socialProfile';
import CreatePostView from '../components/feed/createPostView';

const Tabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const AppRouter = ({RouterStore, AuthStore, ErrorStore}) => {
  const {userToken, isLoading, selectedDeviceToken} = AuthStore;
  const {showErrorView} = ErrorStore;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={Theme}>
        <NavigationContainer
          onStateChange={state => RouterStore.setRouterState(state)}
          ref={navigatorRef => RouterStore.setRouterRef(navigatorRef)}>
          {showErrorView ? (
            <Stack.Navigator>
              <Stack.Screen
                name="error"
                component={ErrorView}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              {isLoading ? (
                <Stack.Screen
                  name="splash"
                  component={Splash}
                  options={{headerShown: false}}
                />
              ) : userToken ? (
                selectedDeviceToken ? (
                  <>
                    <Stack.Screen
                      name="home"
                      options={{headerShown: false}}
                      children={() => (
                        <SafeAreaView style={[styles.container]}>
                          <Tabs.Navigator
                            initialRouteName="Profile"
                            tabBarPosition={'bottom'}>
                            <Tabs.Screen
                              name="Feed"
                              children={() => (
                                <SafeAreaView style={[styles.container]}>
                                  <Stack.Navigator>
                                    <Stack.Screen
                                      name="feedView"
                                      component={Feed}
                                      options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                      name="createPostView"
                                      component={CreatePostView}
                                      options={{title: 'Create Post'}}
                                    />
                                  </Stack.Navigator>
                                </SafeAreaView>
                              )}
                            />
                            <Tabs.Screen name="Profile" component={Profile} />
                            <Tabs.Screen
                              name="Community"
                              children={() => (
                                <SafeAreaView style={[styles.container]}>
                                  <Tabs.Navigator>
                                    <Tabs.Screen
                                      name="Friends"
                                      component={FriendsView}
                                    />
                                    <Tabs.Screen
                                      name="Groups"
                                      component={Group}
                                    />
                                  </Tabs.Navigator>
                                </SafeAreaView>
                              )}
                            />
                          </Tabs.Navigator>
                        </SafeAreaView>
                      )}
                    />
                    <Stack.Screen
                      name="socialProfile"
                      component={SocialProfile}
                      options={{headerShown: false}}
                    />
                    <Stack.Screen
                      name="commentsView"
                      component={CommentsView}
                      options={{title: 'Comments'}}
                    />
                    <Stack.Screen
                      name="deviceSelection2"
                      component={DeviceSelection}
                      options={{headerTitle: 'Select Device'}}
                    />
                    <Stack.Screen
                      name="settingsView"
                      component={SettingsView}
                      options={{title: 'Settings'}}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="deviceSelection"
                    component={DeviceSelection}
                    options={{headerTitle: 'Select Device'}}
                  />
                )
              ) : (
                <Stack.Screen name="login" component={Login} />
              )}
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default inject('AuthStore', 'RouterStore', 'ErrorStore')(
  observer(AppRouter),
);
