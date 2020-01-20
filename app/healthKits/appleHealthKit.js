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
    AppleHealthKit.getStepCount({}, (err, results) => {
      if (err) {
        alert('error:' + err);
        return;
      }
      alert(`Steps for current day :${results.value}`);
    });
  });
};
