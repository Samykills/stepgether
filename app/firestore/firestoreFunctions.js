import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const USER_COLLECTION = 'users';

export const getCurrentUserInfo = () => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .get()
    .then(
      doc => {
        if (!doc.exists) {
          return null;
        } else {
          return doc.data();
        }
      },
      err => {
        handleFirestoreError(err);
      },
    );
};

/**
 * this function saves selectedDeviceToken to users table
 * @param {string} selectedDeviceToken
 */
export const saveSelectedDeviceToken = selectedDeviceToken => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .set({selectedDevice: selectedDeviceToken}, {merge: true})
    .then(res => {
      return res;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

const handleFirestoreError = err => {
  console.error(err);
  throw err;
};
