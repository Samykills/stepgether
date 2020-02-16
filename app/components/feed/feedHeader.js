import React from 'react';
import {View, FlatList} from 'react-native';
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
    <View
      style={{
        height: 100,
        backgroundColor: 'white',
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={userStories}
        ListHeaderComponent={() => <SelfStoryComponent story={selfStory} />}
        renderItem={({item}) => <UserStoriesComponent story={item} />}
        keyExtractor={item => item.userId.toString()}
        removeClippedSubviews={true}
      />
      <Divider style={{backgroundColor: '#000000FF'}} />
    </View>
  );
};

FeedHeader.propTypes = {
  userDetails: PropTypes.object,
  userStories: PropTypes.array,
};

export default FeedHeader;
