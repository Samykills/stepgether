import React from 'react';
import Group from '../components/group';
import Feed from '../components/feed';
import Profile from '../components/profile';
import Splash from '../components/splash';
import Login from '../components/login';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {inject, observer} from 'mobx-react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ErrorView from '../components/error';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const AppRouter = ({RouterStore, AuthStore, ErrorStore}) => {
  const {userToken, isLoading} = AuthStore;
  const {showErrorView} = ErrorStore;
  console.warn('approuter', userToken);

  return (
    <SafeAreaProvider>
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
            ) : (
              <Stack.Screen name="login" component={Login} />
            )}
          </Stack.Navigator>
        )}
      </NavigationNativeContainer>
    </SafeAreaProvider>
  );
};

export default inject(
  'AuthStore',
  'RouterStore',
  'ErrorStore',
)(observer(AppRouter));
