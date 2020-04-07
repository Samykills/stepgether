import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import StepgetherAvatar from '../common/stepgetherAvatar';
import PropTypes from 'prop-types';
const FriendListItem = ({friendInfo}) => {
  return (
    <>
      <Divider />
      <View style={[styles.container]}>
        <StepgetherAvatar
          avatarType={friendInfo.photoUrl}
          title={friendInfo.displayName}
          size={60}
        />
        <View style={[styles.textContainer]}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {friendInfo.displayName}
          </Text>
        </View>
      </View>
      <Divider />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {flex: 1, padding: 10},
});
FriendListItem.propTypes = {
  friendInfo: PropTypes.object,
};

export default FriendListItem;
