import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {algoliaSearchUsers} from '../../functionsApi/firebaseCloudFunctions';
import FriendListItem from './friendListItem';

const {width} = Dimensions.get('screen');
const ANIMATION_DURATION = 120;

const FriendsHeader = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const ANIMATED_SEARCH_VALUE = useRef(new Animated.Value(0)).current;
  const showSearchView = ANIMATED_SEARCH_VALUE.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [width, width / 2, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (searchResults.length > 0) {
      Animated.timing(ANIMATED_SEARCH_VALUE, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(ANIMATED_SEARCH_VALUE, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [searchResults]);

  const updateSearch = (searchKey) => {
    setSearchText(searchKey);
    if (searchKey) {
      algoliaSearchUsers(searchKey).then((res) => {
        const searchResArray = res.map((item) => {
          return {
            imageUrl: item.photoUrl,
            name: item.displayName,
            id: item.uid,
          };
        });
        setSearchResults(searchResArray);
      });
    } else {
      setSearchResults([]);
    }
  };

  const openProfile = () => {};

  return (
    <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={searchText}
        lightTheme={true}
        platform={Platform.OS}
      />
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateX: showSearchView}]},
        ]}>
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <TouchableOpacity onPress={openProfile}>
              <FriendListItem friendInfo={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    left: '2%',
    top: 65,
    flex: 1,
    width: '96%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 1,
  },
});
export default FriendsHeader;
