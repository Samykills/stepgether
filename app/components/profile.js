import React, {useReducer, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Apple_GetSteps} from '../healthKits/appleHealthKit';
import {Fitbit_UserActivity} from '../healthKits/fitbitKit';
import {inject} from 'mobx-react';
import {DeviceConstants} from '../constants';
import {Icon} from 'react-native-elements';
import AnimatedCircle from './common/animatedCircle';
import {useNavigation} from '@react-navigation/native';

const FITBIT_ACTIVITY = 'fitbitActivity';
const APPLE_ACTIVITY = 'appleActivity';
const REFRESHING = 'refreshing';

const Profile = ({AuthStore}) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(
    (oldState, action) => {
      switch (action.type) {
        case FITBIT_ACTIVITY:
          return {
            ...oldState,
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
          return {...oldState};
        case REFRESHING:
          return {...oldState};
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
  });

  const getActivity = date => {
    switch (selectedDeviceToken) {
      case DeviceConstants.DEVICE_FITBIT:
        fitBitActivity(date);
        break;
      case DeviceConstants.DEVICE_APPLE_WATCH:
        Platform.OS === 'ios' ? Apple_GetSteps() : null;
        break;
      default:
        break;
    }
  };

  const fitBitActivity = async date => {
    const fitBitActivityRes = await Fitbit_UserActivity(date);
    const fairlyActiveMinutes = fitBitActivityRes.summary.fairlyActiveMinutes,
      lightlyActiveMinutes = fitBitActivityRes.summary.lightlyActiveMinutes,
      veryActiveMinutes = fitBitActivityRes.summary.veryActiveMinutes;

    const totalTimeActive =
      fairlyActiveMinutes + lightlyActiveMinutes + veryActiveMinutes;

    let distance = 0;
    fitBitActivityRes.summary.distances.map(dist => {
      distance = distance + dist.distance;
    });
    dispatch({
      type: FITBIT_ACTIVITY,
      payload: {
        fitBitActivity: fitBitActivityRes,
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

  const onPullDownRefresh = () => {
    dispatch({type: REFRESHING});
    getActivity(new Date());
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.header]}>
        <Icon
          name="keyboard-arrow-left"
          type="MaterialIcons"
          color="#517fa4"
          onPress={() => onBackPress()}
        />
        <View style={[styles.headerTextView]}>
          <Text>
            {state.selectedDate.getDate() === new Date().getDate()
              ? 'Today'
              : state.selectedDate.toISOString().split('T')[0]}
          </Text>
        </View>
        <Icon
          name="settings"
          type="MaterialIcons"
          color="#517fa4"
          onPress={() => navigation.navigate('settingsView')}
        />
      </View>
      <View style={[styles.content]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={onPullDownRefresh}
            />
          }>
          <View style={[styles.mainCircle]}>
            <AnimatedCircle
              currentValue={state.steps}
              maxValue={state.goalSteps}
              textStyle={[styles.mainCircleTextStyle]}
              title={'Steps'}
              size={100}
            />
          </View>
          <View style={[styles.subCircle]}>
            <AnimatedCircle
              currentValue={state.distance}
              maxValue={state.goalDistance}
              textStyle={[styles.subCircleTextStyle]}
              title={'Miles'}
              size={80}
            />
            <AnimatedCircle
              currentValue={state.caloriesBurned}
              maxValue={state.goalCaloriesBurned}
              textStyle={[styles.subCircleTextStyle]}
              title={'Calories'}
              size={80}
            />
            <AnimatedCircle
              currentValue={state.activeTime}
              maxValue={state.goalActiveTime}
              textStyle={[styles.subCircleTextStyle]}
              title={'Mins'}
              size={80}
            />
          </View>

          <View style={[styles.activity]}>
            <Text>{JSON.stringify(state.activity)}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {flex: 1},
  mainCircle: {justifyContent: 'center', alignItems: 'center', height: 120},
  mainCircleTextStyle: {
    fontSize: 20,
    fontWeight: '600',
  },
  subCircle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 120,
  },
  subCircleTextStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
  activity: {
    paddingLeft: 30,
    height: 200,
    backgroundColor: 'red',
  },
});
export default inject('AuthStore')(Profile);
