import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLOR_BLUE} from '../../../theme/colors';

const CreatePostButton = () => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: '3%',
        right: '3%',
      }}>
      <Icon
        reverse
        raised
        name="plus"
        type="entypo"
        color={COLOR_BLUE}
        onPress={() => alert('create new post')}
      />
    </View>
  );
};

export default CreatePostButton;
