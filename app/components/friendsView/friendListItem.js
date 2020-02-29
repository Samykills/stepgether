import React from 'react';
import {View, Text} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import StepgetherAvatar from '../common/stepgetherAvatar';
import PropTypes from 'prop-types';
const FriendListItem = ({friendInfo}) => {
  return (
    <>
      <Divider />
      <View
        style={{
          height: 80,
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <StepgetherAvatar
          avatarType={friendInfo.imageUrl}
          title={friendInfo.name}
          size={60}
        />
        <View style={{flex: 1, padding: 10}}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {friendInfo.name}
          </Text>
        </View>
      </View>
      <Divider />
    </>
  );
};

FriendListItem.propTypes = {
  friendInfo: PropTypes.object,
};

export default FriendListItem;
