/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Profile = () => {


  useFocusEffect(() => {});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};
export default Profile;
