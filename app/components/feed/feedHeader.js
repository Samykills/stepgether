import React from 'react';
import {View, Platform, FlatList, Text} from 'react-native';
import StepgetherAvatar from '../common/stepgetherAvatar';
import {Divider} from 'react-native-elements';
import PropTypes from 'prop-types';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
        ListHeaderComponent={() => (
          <UserStoriesComponent story={selfStory} self={true} />
        )}
        renderItem={({item}) => <UserStoriesComponent story={item} />}
        keyExtractor={(item, index) => item.userId.toString()}
      />
      <Divider style={{backgroundColor: '#000000FF'}} />
    </View>
  );
};

const UserStoriesComponent = ({story, self}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 95,
        }}>
        <AnimatedCircularProgress
          size={self ? 70 : 60}
          width={1}
          fill={100}
          tintColor={story.viewed ? 'red' : 'grey'}
          children={() =>
            self ? (
              <StepgetherAvatar
                avatarType={story.userImageUrl}
                size={50}
                onEditPress={() => alert('story')}
              />
            ) : (
              <StepgetherAvatar avatarType={story.userImageUrl} size={50} />
            )
          }
        />
        <Text style={{marginTop: 10, fontSize: 12}}>{story.userName}</Text>
      </View>
    </View>
  );
};
FeedHeader.propTypes = {
  userDetails: PropTypes.object,
  userStories: PropTypes.array,
};

export default FeedHeader;
