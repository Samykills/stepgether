import React, {useReducer, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Fitbit_UserActivity} from '../healthKits/fitbitKit';
import {inject} from 'mobx-react';
import {DeviceConstants} from '../constants';
import {Icon} from 'react-native-elements';
import AnimatedCircle from './common/animatedCircle';

const FITBIT_ACTIVITY = 'fitbitActivity';
const APPLE_ACTIVITY = 'appleActivity';
const REFRESHING = 'refreshing';

const Profile = ({AuthStore}) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case FITBIT_ACTIVITY:
          return {
            ...state,
            activity: action.payload.fitBitActivity,
            steps: action.payload.fitBitActivity.summary.steps,
            caloriesBurned: action.payload.fitBitActivity.summary.caloriesOut,
            activeTime: action.payload.totalTimeActive,
            distance: action.payload.distance,
            goalDistance: action.payload.fitBitActivity.goals.distance,
            goalSteps: action.payload.fitBitActivity.goals.steps,
            goalCaloriesBurned: action.payload.fitBitActivity.goals.caloriesOut,
            goalActiveTime: action.payload.fitBitActivity.goals.activeMinutes,
            selectedDate: action.payload.selectedDate,
            refreshing: false,
          };
        case APPLE_ACTIVITY:
          return {...state};
        case REFRESHING:
          return {...state};
        default:
          throw new Error();
      }
    },
    {
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
      refreshing: false,
    },
  );

  const {selectedDeviceToken} = AuthStore;

  useEffect(() => {
    getActivity(new Date());
  }, []);

  const getActivity = date => {
    switch (selectedDeviceToken) {
      case DeviceConstants.DEVICE_FITBIT:
        fitBitActivity(date);
        break;
      case DeviceConstants.DEVICE_APPLE_WATCH:
        Platform.OS == 'ios' ? Apple_GetSteps() : null;
        break;
      default:
        break;
    }
  };

  const fitBitActivity = async date => {
    const fitBitActivity = await Fitbit_UserActivity(date);
    const fairlyActiveMinutes = fitBitActivity.summary.fairlyActiveMinutes,
      lightlyActiveMinutes = fitBitActivity.summary.lightlyActiveMinutes,
      veryActiveMinutes = fitBitActivity.summary.veryActiveMinutes;

    const totalTimeActive =
      fairlyActiveMinutes + lightlyActiveMinutes + veryActiveMinutes;

    let distance = 0;
    fitBitActivity.summary.distances.map(dist => {
      distance = distance + dist.distance;
    });
    dispatch({
      type: FITBIT_ACTIVITY,
      payload: {
        fitBitActivity: fitBitActivity,
        totalTimeActive: totalTimeActive,
        distance: distance,
        selectedDate: date,
      },
    });
  };

  const onBackPress = () => {
    let newDate = new Date();
    newDate.setDate(state.selectedDate.getDate() - 1);
    getActivity(newDate);
  };

  const onRefresh = useCallback(() => {
    dispatch({type: REFRESHING});
    getActivity(new Date());
  });

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
              : state.selectedDate.toISOString().split('T')[0]}
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 120,
            }}>
            <AnimatedCircle
              currentValue={state.steps}
              maxValue={state.goalSteps}
              textStyle={{fontSize: 20, fontWeight: '600'}}
              title={'Steps'}
              size={100}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              height: 120,
            }}>
            <AnimatedCircle
              currentValue={state.distance}
              maxValue={state.goalDistance}
              textStyle={{fontSize: 12, fontWeight: '600'}}
              title={'Miles'}
              size={80}
            />
            <AnimatedCircle
              currentValue={state.caloriesBurned}
              maxValue={state.goalCaloriesBurned}
              textStyle={{fontSize: 12, fontWeight: '600'}}
              title={'Calories'}
              size={80}
            />
            <AnimatedCircle
              currentValue={state.activeTime}
              maxValue={state.goalActiveTime}
              textStyle={{fontSize: 12, fontWeight: '600'}}
              title={'Mins'}
              size={80}
            />
          </View>

          <View style={{paddingLeft: 30, height: 200, backgroundColor: 'red'}}>
            <Text>{JSON.stringify(state.activity)}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Profile);
