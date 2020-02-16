import React from 'react';
import {View, Text} from 'react-native';
import StepgetherAvatar from './stepgetherAvatar';

const SelfStoryComponent = ({story}) => {
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
          width: 100,
        }}>
        <StepgetherAvatar
          avatarType={story.userImageUrl}
          size={55}
          onEditPress={() => alert('story')}
        />
        <Text style={{marginTop: 10, fontSize: 12}}>{story.userName}</Text>
      </View>
    </View>
  );
};

export default SelfStoryComponent;
