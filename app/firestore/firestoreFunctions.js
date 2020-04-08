import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const USER_COLLECTION = 'users';
const NEW_FOLLOWERS_REQUEST = 'newFollowersRequest';
const FOLLOWERS_LIST = 'followersList';

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
 * get user info from userId
 * @param {string} userId
 */
export const getUserInfo = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
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
 * add the current authenticated user to the newFollowers collection for the selected userId.
 * @param {*} userId
 */
export const followAUser = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(NEW_FOLLOWERS_REQUEST)
    .doc(auth().currentUser.uid)
    .set({
      uid: auth().currentUser.uid,
      photoUrl: auth().currentUser.photoURL,
      displayName: auth().currentUser.displayName,
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

/**
 * cancel the follow request
 * @param {*} userId
 */
export const deleteFollowRequest = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(NEW_FOLLOWERS_REQUEST)
    .doc(auth().currentUser.uid)
    .delete()
    .then(res => {
      return true;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

/**
 * get a list of new followers for the user via userId
 * @param {string} userId
 */
export const getNewFollowersRequest = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId ? userId : auth().currentUser.uid)
    .collection(NEW_FOLLOWERS_REQUEST)
    .get()
    .then(
      snapshot => {
        if (snapshot.empty) {
          return null;
        }
        let newFriendsList = [];
        snapshot.forEach(doc => {
          newFriendsList.push(doc.data());
        });
        return newFriendsList;
      },
      err => {
        handleFirestoreError(err);
      },
    );
};

/**
 * subscribe to newfollowers
 */
export const subscribeToNewFollowersRequestCollection = firestore()
  .collection(USER_COLLECTION)
  .doc(auth().currentUser.uid)
  .collection(NEW_FOLLOWERS_REQUEST);

/**
 * If current user is a follower return true else false
 * @param {string} userId
 * @returns {boolean}
 */
export const ifCurrentUserIsFollower = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(FOLLOWERS_LIST)
    .doc(auth().currentUser.uid)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      handleFirestoreError(err);
    });
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
