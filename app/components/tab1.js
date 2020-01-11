/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import AppleHealthKit from 'rn-apple-healthkit';
const PERMS = AppleHealthKit.Constants.Permissions;

const Tab1 = ({TabBarStore}) => {
  const {setCurrentScene} = TabBarStore;

  useFocusEffect(() => {
    setTimeout(() => setCurrentScene(), 0);
    let options = {
      permissions: {
        read: [
          PERMS.StepCount,
          PERMS.BloodPressureDiastolic,
          PERMS.DistanceCycling,
        ],
      },
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }
      AppleHealthKit.getStepCount({}, (err, results) => {
        if (err) {
          alert('error:' + err);
          return;
        }
        alert(`Steps for current day :${results.value}`);
      });
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>tab1</Text>
    </SafeAreaView>
  );
};
export default inject('TabBarStore')(observer(Tab1));
