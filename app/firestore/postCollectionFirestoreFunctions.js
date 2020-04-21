import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Snackbar from 'react-native-snackbar';

const POST_COLLECTION = 'posts';
// firestore().settings({
//   host: "http://127.0.0.1:8080",
//   ssl: false
// })

export const getAllPost = followersList => {
  //add current user to followersList again
  //TODO : optimize and add pagination for post queries.
  let fl = followersList;
  fl.push(auth().currentUser.uid);
  return firestore()
    .collection(POST_COLLECTION)
    .orderBy('modifiedAt', 'desc')
    .get()
    .then(querySnapshot => {
      let postList = [];
      querySnapshot.forEach(snapShot => {
        let post = snapShot.data();
        if (fl.includes(post.createdBy) && post.reports < 3) {
          post.postId = snapShot.id;
          postList.push(post);
        }
      });
      return postList;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

export const savePostToCollection = async postData => {
  postData.createdAt = firestore.FieldValue.serverTimestamp();
  postData.modifiedAt = firestore.FieldValue.serverTimestamp();
  postData.likes = 0;
  postData.comments = 0;
  postData.reports = 0;
  postData.reportedBy = [];
  postData.createdBy = auth().currentUser.uid;
  postData.createdByUserDisplayName = auth().currentUser.displayName;
  postData.createdByUserPhotoUrl = auth().currentUser.photoURL;
  // save file to cloud storage here.
  const reference = storage().ref(`stepgether-${new Date().getTime()}`);
  await reference.putFile(postData.postPhotoUrl);
  postData.postPhotoUrl = await reference.getDownloadURL();
  //save the post to firestore.
  return firestore()
    .collection(POST_COLLECTION)
    .add(postData)
    .then(
      doc => {
        return doc.id;
      },
      err => {
        handleFirestoreError(err);
      },
    );
};

export const modifyPostInCollection = postData => {
  const currentUserId = auth().currentUser.uid;
  if (!postData.reportedBy.includes(currentUserId)) {
    postData.reports = postData.reports + 1;
    postData.reportedBy.push(auth().currentUser.uid);
    // postData.modifiedAt = firestore.FieldValue.serverTimestamp();
    //save the post to firestore.
    return firestore()
      .collection(POST_COLLECTION)
      .doc(postData.postId)
      .set(postData, {merge: true})
      .then(
        res => {
          Snackbar.show({
            text: 'Report Submitted!',
            duration: Snackbar.LENGTH_SHORT,
          });
          return res;
        },
        err => {
          handleFirestoreError(err);
        },
      );
  } else {
    Snackbar.show({
      text: 'You have already reported this post!',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};

const handleFirestoreError = err => {
  console.error(err);
  throw err;
};
