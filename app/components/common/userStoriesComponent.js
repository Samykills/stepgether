import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    <View style={[styles.container]}>
      <View style={[styles.subContainer]}>
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
          style={[styles.textStyle]}
          ellipsizeMode={'tail'}
          numberOfLines={1}>
          {story.userName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
  textStyle: {marginTop: 10, fontSize: 12},
});
export default UserStoriesComponent;
