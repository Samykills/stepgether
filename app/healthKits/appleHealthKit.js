import { Alert } from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
const PERMS = AppleHealthKit.Constants.Permissions;

export const Apple_GetSteps = () => {
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
    AppleHealthKit.getStepCount({}, (error, countResults) => {
      if (error) {
        Alert.alert('error:' + error);
        return;
      }
      Alert.alert(`Steps for current day :${countResults.value}`);
    });
  });
};
