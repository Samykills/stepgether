import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Platform, Text} from 'react-native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Fitbit_UserActivity} from '../healthKits/fitbitKit';
import {inject} from 'mobx-react';
import {DeviceConstants} from '../constants';
import AnimateNumber from 'react-native-animate-number';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Icon} from 'react-native-elements';

const Profile = ({AuthStore}) => {
  const [state, setState] = useState({
    activity: '',
    steps: 0,
    caloriesBurned: 0,
    activeTime: 0,
    distance: 0,
    goalDistance: 1,
    goalSteps: 1,
    goalCaloriesBurned: 1,
    goalActiveTime: 1,
    selectedDate: new Date(),
  });

  const {selectedDeviceToken} = AuthStore;

  useEffect(() => {
    switch (selectedDeviceToken) {
      case DeviceConstants.DEVICE_FITBIT:
        fitBitActivity();
        break;
      case DeviceConstants.DEVICE_APPLE_WATCH:
        Platform.OS == 'ios' ? Apple_GetSteps() : null;
        break;
      default:
        break;
    }
  }, []);

  const fitBitActivity = async date => {
    const fitBitActivity = await Fitbit_UserActivity(date ? date : null);
    const fairlyActiveMinutes = fitBitActivity.summary.fairlyActiveMinutes,
      lightlyActiveMinutes = fitBitActivity.summary.lightlyActiveMinutes,
      veryActiveMinutes = fitBitActivity.summary.veryActiveMinutes;

    const totalTimeActive =
      fairlyActiveMinutes + lightlyActiveMinutes + veryActiveMinutes;

    let distance = 0;
    fitBitActivity.summary.distances.map(dist => {
      distance = distance + dist.distance;
    });
    setState({
      ...state,
      activity: fitBitActivity,
      steps: fitBitActivity.summary.steps,
      caloriesBurned: fitBitActivity.summary.caloriesOut,
      activeTime: totalTimeActive,
      distance: distance,
      goalDistance: fitBitActivity.goals.distance,
      goalSteps: fitBitActivity.goals.steps,
      goalCaloriesBurned: fitBitActivity.goals.caloriesOut,
      goalActiveTime: fitBitActivity.goals.activeMinutes,
    });
  };

  const onBackPress = () => {
    let newDate = new Date();
    newDate.setDate(state.selectedDate.getDate() - 1);
    setState({...state, selectedDate: newDate});
    fitBitActivity(newDate);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alginItems: 'center',
        }}>
        <Icon
          name="keyboard-arrow-left"
          type="MaterialIcons"
          color="#517fa4"
          onPress={() => onBackPress()}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            {state.selectedDate.getDate() == new Date().getDate()
              ? 'Today'
              : new Date().toISOString().split('T')[0]}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 120,
        }}>
        <AnimatedCircularProgress
          size={100}
          width={5}
          fill={(state.steps / state.goalSteps) * 100}
          tintColor="#1D1C20"
          backgroundColor="#DCDAE0"
          children={() => (
            <>
              <AnimateNumber
                style={{fontSize: 20, fontWeight: '600'}}
                value={state.steps}
                formatter={val => {
                  return Math.ceil(val);
                }}
              />
              <Text>steps</Text>
            </>
          )}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          height: 120,
        }}>
        <AnimatedCircularProgress
          size={80}
          width={5}
          fill={(state.distance / state.goalDistance) * 100}
          tintColor="#1D1C20"
          backgroundColor="#DCDAE0"
          children={() => (
            <>
              <AnimateNumber
                style={{fontSize: 12, fontWeight: '600'}}
                value={state.distance}
                formatter={val => {
                  return Math.ceil(val);
                }}
              />

              <Text style={{fontSize: 10, fontWeight: '600'}}>distance</Text>
            </>
          )}
        />
        <AnimatedCircularProgress
          size={80}
          width={5}
          fill={(state.caloriesBurned / state.goalCaloriesBurned) * 100}
          tintColor="#1D1C20"
          backgroundColor="#DCDAE0"
          children={() => (
            <>
              <AnimateNumber
                style={{fontSize: 12, fontWeight: '600'}}
                value={state.caloriesBurned}
                formatter={val => {
                  return Math.ceil(val);
                }}
              />

              <Text style={{fontSize: 10, fontWeight: '600'}}>calories</Text>
            </>
          )}
        />
        <AnimatedCircularProgress
          size={80}
          width={5}
          fill={(state.activeTime / state.goalActiveTime) * 100}
          tintColor="#1D1C20"
          backgroundColor="#DCDAE0"
          children={() => (
            <>
              <Text style={{fontSize: 12, fontWeight: '600'}}>
                {state.activeTime}
              </Text>

              <Text style={{fontSize: 10, fontWeight: '600'}}>time</Text>
            </>
          )}
        />
      </View>
      <View style={{paddingLeft: 30, height: 200, backgroundColor: 'red'}}>
        <Text>{JSON.stringify(state.activity)}</Text>
      </View>
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Profile);
