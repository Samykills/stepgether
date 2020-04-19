import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const POST_COLLECTION = 'posts';
// firestore().settings({
//   host: "http://127.0.0.1:8080",
//   ssl: false
// })

export const getAllPost = followersList => {
  //add current user to followersList again
  followersList.push(auth().currentUser.uid);
  return firestore()
    .collection(POST_COLLECTION)
    .where('createdBy', 'in', followersList)
    .orderBy('modifiedAt', 'desc')
    .get()
    .then(querySnapshot => {
      let postList = [];
      querySnapshot.forEach(snapShot => {
        let postData = snapShot.data();
        postData.postId = snapShot.id;
        postList.push(postData);
      });
      return postList;
    })
    .catch(err => {
      handleFirestoreError(err);
    });
};

export const savePostToCollection = postData => {
  postData.createdAt = firestore.FieldValue.serverTimestamp();
  postData.modifiedAt = firestore.FieldValue.serverTimestamp();
  postData.likes = 0;
  postData.comments = 0;
  postData.createdBy = auth().currentUser.uid;
  postData.createdByUserDisplayName = auth().currentUser.displayName;
  postData.createdByUserPhotoUrl = auth().currentUser.photoURL;
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

const handleFirestoreError = err => {
  console.error(err);
  throw err;
};
