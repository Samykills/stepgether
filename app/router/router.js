import React from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {inject, observer} from 'mobx-react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const AppRouter = ({RouterStore, AuthStore, ErrorStore}) => {
  const {userToken, isLoading, selectedDeviceToken} = AuthStore;
  const {showErrorView} = ErrorStore;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={Theme}>
        <NavigationNativeContainer
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
                      component={() => (
                        <Tab.Navigator
                          initialRouteName="Profile"
                          tabBarPosition={'bottom'}>
                          <Tab.Screen name="Feed" component={Feed} />
                          <Tab.Screen name="Profile" component={Profile} />
                          <Tab.Screen name="Group" component={Group} />
                        </Tab.Navigator>
                      )}
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
        </NavigationNativeContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default inject(
  'AuthStore',
  'RouterStore',
  'ErrorStore',
)(observer(AppRouter));
