// import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import algoliasearch from 'algoliasearch';
if (__DEV__) {
  // functions().useFunctionsEmulator('http://127.0.0.1:5001');
}

/**
 * Aloglia search to search for users in friendsview.
 * @param {string} searchKey
 */
export const algoliaSearchUsers = searchKey => {
  const ALGOLIA_APP_ID = 'HTPL0RS86J';
  const ALGOLIA_SEARCH_KEY = 'ae48ead2cfd0c531291053ca41161e59';
  const ALGOLIA_INDEX_NAME = 'prod_USERS';

  let searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  let index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

  return index
    .search(searchKey)
    .then(function(responses) {
      return responses.hits.filter(res => res.uid !== auth().currentUser.uid);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * test function call here
 */

//  export const testFunc = functions().httpsCallable('someTestFunction');
// testFunc({
//   displayName: 'ullas gupta',
//   photoUrl:
//     'https://lh3.googleusercontent.com/a-/AOh14GjNJq0mK8tfV0-sz7tFdfpcq-LmocXVzIAz7qATeQ=s96-c',
//   uid: '7GkiB0FYrEPHt9BYO6608flSJdH3',
// }).then(res => {
//   debugger;
// });
