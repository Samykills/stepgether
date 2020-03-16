import React, {useState} from 'react';
import {Platform} from 'react-native';
import {SearchBar} from 'react-native-elements';
const FriendsHeader = () => {
  const [searchText, setSearchText] = useState('');
  const updateSearch = search => {
    setSearchText({search});
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
