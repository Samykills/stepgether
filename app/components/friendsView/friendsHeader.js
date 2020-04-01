import React, {useState} from 'react';
import {Platform} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {algoliaSearchUsers} from '../../functionsApi/firebaseCloudFunctions';
const FriendsHeader = () => {
  const [searchText, setSearchText] = useState('');
  const updateSearch = searchKey => {
    setSearchText(searchKey);
    algoliaSearchUsers(searchKey).then(res => {
      // debugger;
      console.log(res);
    });
  };
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={searchText}
      lightTheme={true}
      platform={Platform.OS}
    />
  );
};

export default FriendsHeader;
