import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const USER_COLLECTION = 'users';
const NEW_FOLLOWERS_REQUEST = 'newFollowersRequest';
const FOLLOWERS_LIST = 'followersList';
// firestore().settings({
//   host: "http://127.0.0.1:8080",
//   ssl: false
// })
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
 * @param {string} userId
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
 * unfollow a user, this delete the users form both the followers list.
 * @param {string} userId
 */
export const unFollowAUser = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .collection(FOLLOWERS_LIST)
    .doc(userId)
    .delete()
    .catch(err => {
      handleFirestoreError(err);
    });
};
/**
 * delete the follow request of current logged in user for the passed userId
 * @param {*} userId
 */
export const deleteCurrentUsersFollowRequest = userId => {
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
 * decline a user's follow request
 * @param {*} err
 */
export const declineAFollowRequest = userId => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .collection(NEW_FOLLOWERS_REQUEST)
    .doc(userId)
    .delete()
    .then(res => {
      return true;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

/**
 * accept a user's follow request
 * @param {*} friendInfo
 */
export const acceptAFollowRequest = friendInfo => {
  // ok here is what we need to do...add two cloud functions that gets triggered onCreate and onDelete for followersList.
  //onCreate we declineAFollowRequest and add to current and following users followersList.
  //onDelete we remove/delete from current and following users FollowersList.
  // declineAFollowRequest(friendInfo.uid);
  //add to the following users followers list
  //add to currentUsers followers list
  return firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .collection(FOLLOWERS_LIST)
    .doc(friendInfo.uid)
    .set(friendInfo)
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
 * subscribe to newfollowersList
 */
export const subscribeToNewFollowersRequestCollection = () =>
  firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .collection(NEW_FOLLOWERS_REQUEST);

/**
 * subscribe to followersList
 *
 */
export const subscribeToFollowersListCollection = () =>
  firestore()
    .collection(USER_COLLECTION)
    .doc(auth().currentUser.uid)
    .collection(FOLLOWERS_LIST);

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
