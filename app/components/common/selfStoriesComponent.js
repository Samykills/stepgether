import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import StepgetherAvatar from './stepgetherAvatar';

const SelfStoryComponent = ({story}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.subContainer]}>
        <StepgetherAvatar
          avatarType={story.userImageUrl}
          size={55}
          title={story.userName}
          onEditPress={() => Alert.alert('story')}
        />
        <Text style={[styles.textStyle]}>{story.userName}</Text>
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
    width: 100,
  },
  textStyle: {marginTop: 10, fontSize: 12},
});
export default SelfStoryComponent;
