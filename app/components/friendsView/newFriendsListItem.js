import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import StepgetherAvatar from '../common/stepgetherAvatar';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const NewFriendsListItem = ({friendInfo}) => {
  const navigation = useNavigation();
  const openProfile = () => navigation.navigate('socialProfile');
  return (
    <>
      <Divider />
      <View style={[styles.container]}>
        <StepgetherAvatar
          avatarType={friendInfo.photoUrl}
          title={friendInfo.displayName}
          size={60}
          onPress={openProfile}
        />
        <View style={[styles.name]}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {friendInfo.displayName}
          </Text>
        </View>
        <View style={[styles.options]}>
          <Button title="Accept" />
          <Button title="Reject" type="outline" />
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
