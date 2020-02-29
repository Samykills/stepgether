import React from 'react';
import {View, Text} from 'react-native';
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
          onPress={openProfile}
        />
        <View style={{flex: 1, padding: 10}}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {friendInfo.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Button title="Accept" />
          <Button title="Reject" type="outline" />
        </View>
      </View>
      <Divider />
    </>
  );
};

NewFriendsListItem.propTypes = {
  friendInfo: PropTypes.object,
};

export default NewFriendsListItem;
