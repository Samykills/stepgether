import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import PropTypes from 'prop-types';
import SelfStoryComponent from '../common/selfStoriesComponent';
import UserStoriesComponent from '../common/userStoriesComponent';

const FeedHeader = ({userDetails, userStories}) => {
  let selfStory = {
    userId: 7,
    userImageUrl: userDetails.userImageUrl,
    userName: 'Your Story',
  };
  return (
    <View style={[styles.container]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={userStories}
        ListHeaderComponent={() => <SelfStoryComponent story={selfStory} />}
        renderItem={({item}) => <UserStoriesComponent story={item} />}
        keyExtractor={item => item.userId.toString()}
        removeClippedSubviews={true}
      />
      <Divider style={[styles.divider]} />
    </View>
  );
};

FeedHeader.propTypes = {
  userDetails: PropTypes.object,
  userStories: PropTypes.array,
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
  },
  divider: {backgroundColor: '#000000FF'},
});
export default FeedHeader;
