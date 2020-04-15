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
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('screen');
const ANIMATION_DURATION = 120;

const PeopleSearch = ({searchHint, searchResultsStyle, onSearchClick}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(null);
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

  const updateSearch = searchKey => {
    setSearchText(searchKey);
    if (searchKey) {
      algoliaSearchUsers(searchKey).then(res => {
        setSearchResults(res);
      });
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <>
      <SearchBar
        placeholder={searchHint}
        onChangeText={updateSearch}
        value={searchText}
        lightTheme={true}
        platform={Platform.OS}
      />
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateX: showSearchView}]},
          {...searchResultsStyle},
        ]}>
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <FriendListItem friendInfo={item} onSearchClick={onSearchClick} />
          )}
          keyExtractor={(item, index) => item.uid}
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
PeopleSearch.propTypes = {
  searchHint: PropTypes.string,
  searchResultsStyle: PropTypes.object,
  onSearchClick: PropTypes.func,
};
PeopleSearch.defaultProps = {
  searchHint: 'Search People!',
};
export default PeopleSearch;
