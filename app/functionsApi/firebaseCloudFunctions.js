import functions from '@react-native-firebase/functions';
import algoliasearch from 'algoliasearch';
if (__DEV__) {
  // functions().useFunctionsEmulator('http://127.0.0.1:5001');
}
/**
 * this function saves selectedDeviceToken to users table
 * @param {string} selectedDeviceToken
 */
export const saveSelectedDeviceToken = selectedDeviceToken => {
  functions().httpsCallable('saveSelectedDeviceToken')({
    selectedDevice: selectedDeviceToken,
  });
};

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    functions()
      .httpsCallable('getUserInfo')()
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const searchUser = searchKey => {
  return new Promise((resolve, reject) => {
    functions()
      .httpsCallable('searchUser')({searchKey: '988skQqwBAX5gikmRerQ9NvAg5b2'})
      .then(res => {
        debugger;
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const algoliaSearchUsers = searchKey => {
  const ALGOLIA_APP_ID = 'HTPL0RS86J';
  const ALGOLIA_SEARCH_KEY = 'ae48ead2cfd0c531291053ca41161e59';
  const ALGOLIA_INDEX_NAME = 'prod_USERS';

  let searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  let index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

  return index
    .search({
      searchKey,
    })
    .then(function(responses) {
      return console.log(responses.hits);
      debugger;
    });
};