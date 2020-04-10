import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Divider} from 'react-native-elements';
import StepgetherAvatar from '../common/stepgetherAvatar';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const FriendListItem = ({friendInfo}) => {
  const navigation = useNavigation();

  const navigateToSocialProfile = () => {
    navigation.navigate('socialProfile', {userInfo: friendInfo});
  };

  return (
    <TouchableHighlight
      onPress={navigateToSocialProfile}
      underlayColor={'#03A9F4'}>
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
    </TouchableHighlight>
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
