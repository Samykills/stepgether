import React, {useState} from 'react';
import {View, Text} from 'react-native';
import StepgetherAvatar from './stepgetherAvatar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const UserStoriesComponent = ({story}) => {
  const [viewed, setViewed] = useState(story.viewed);
  const onPressUserStory = () => {
    if (!viewed) {
      setViewed(true);
    }
  };
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
          width: 90,
        }}>
        <AnimatedCircularProgress
          size={60}
          width={1}
          fill={100}
          tintColor={viewed ? 'grey' : 'red'}
          children={() => (
            <StepgetherAvatar
              avatarType={story.userImageUrl}
              size={50}
              onPress={onPressUserStory}
              title={story.userName}
            />
          )}
        />
        <Text
          style={{marginTop: 10, fontSize: 12}}
          ellipsizeMode={'tail'}
          numberOfLines={1}>
          {story.userName}
        </Text>
      </View>
    </View>
  );
};
export default UserStoriesComponent;
