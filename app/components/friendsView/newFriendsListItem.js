import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import StepgetherAvatar from '../common/stepgetherAvatar';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {
  declineAFollowRequest,
  acceptAFollowRequest,
} from '../../firestore/firestoreFunctions';
import COLORS from '../../theme/colors';

const NewFriendsListItem = ({friendInfo}) => {
  const navigation = useNavigation();
  const navigateToSocialProfile = () =>
    navigation.navigate('socialProfile', {userInfo: friendInfo});
  const declineUserRequest = () => {
    declineAFollowRequest(friendInfo.uid);
  };
  const acceptUserRequest = () => {
    acceptAFollowRequest(friendInfo);
  };
  return (
    <TouchableHighlight
      onPress={navigateToSocialProfile}
      underlayColor={COLORS.BLUE}>
      <>
        <Divider />
        <View style={[styles.container]}>
          <StepgetherAvatar
            avatarType={friendInfo.photoUrl}
            title={friendInfo.displayName}
            size={60}
          />
          <View style={[styles.name]}>
            <Text numberOfLines={1} ellipsizeMode={'tail'}>
              {friendInfo.displayName}
            </Text>
          </View>
          <View style={[styles.options]}>
            <Button title="Accept" raised onPress={acceptUserRequest} />
            <Button
              title="Reject"
              type="outline"
              raised
              onPress={declineUserRequest}
            />
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
  name: {flex: 1, padding: 10},
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

NewFriendsListItem.propTypes = {
  friendInfo: PropTypes.object,
};

export default NewFriendsListItem;
