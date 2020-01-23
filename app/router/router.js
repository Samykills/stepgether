import React from 'react';
import Group from '../components/group';
import Feed from '../components/feed';
import Profile from '../components/profile';
import Splash from '../components/splash';
import Login from '../components/login';
import DeviceSelection from '../components/deviceSelection';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {inject, observer} from 'mobx-react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ErrorView from '../components/error';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Theme from '../theme/theme';
import {ThemeProvider} from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const AppRouter = ({RouterStore, AuthStore, ErrorStore}) => {
  const {userToken, isLoading, selectedDeviceToken} = AuthStore;
  const {showErrorView} = ErrorStore;
  console.warn('approuter', userToken);

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
                          initialRouteName="Feed"
                          tabBarPosition={'bottom'}>
                          <Tab.Screen name="Feed" component={Feed} />
                          <Tab.Screen name="Group" component={Group} />
                          <Tab.Screen name="Profile" component={Profile} />
                        </Tab.Navigator>
                      )}
                    />
                    <Stack.Screen
                      name="deviceSelection"
                      component={DeviceSelection}
                      options={{headerTitle: 'Select Device'}}
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
