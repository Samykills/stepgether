import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import NewFriendsListItem from './newFriendsListItem';
import PropTypes from 'prop-types';
const FriendsNewRequest = ({newFriendRequestList}) => {
  return newFriendRequestList.length ? (
    <View>
      <Text
        style={{
          fontSize: 16,
          backgroundColor: '#CFD8DC',
          color: '#212121',
          padding: 10,
        }}>
        New Requests!
      </Text>
      <FlatList
        data={newFriendRequestList}
        renderItem={({item}) => <NewFriendsListItem friendInfo={item} />}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  ) : null;
};
FriendsNewRequest.proptypes = {
  newFriendRequestList: PropTypes.array,
};
export default FriendsNewRequest;
