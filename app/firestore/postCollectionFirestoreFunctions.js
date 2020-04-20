import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

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
        if (fl.includes(post.createdBy)) {
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
  postData.createdBy = auth().currentUser.uid;
  postData.createdByUserDisplayName = auth().currentUser.displayName;
  postData.createdByUserPhotoUrl = auth().currentUser.photoURL;
  // save file to cloud storage here.
  const reference = storage().ref(`stepgether-${new Date().getTime()}.png`);
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

const handleFirestoreError = err => {
  console.error(err);
  throw err;
};
