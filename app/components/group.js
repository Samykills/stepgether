/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Group = () => {
  useFocusEffect(() => {});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Group</Text>
    </SafeAreaView>
  );
};
export default Group;
