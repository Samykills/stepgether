import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import NewFriendsListItem from './newFriendsListItem';
import PropTypes from 'prop-types';
const FriendsNewRequest = ({newFriendRequestList}) => {
  return newFriendRequestList.length > 0 ? (
    <View>
      <FlatList
        data={newFriendRequestList}
        ListHeaderComponent={() => (
          <Text style={[styles.requestTextStyle]}>New Requests!</Text>
        )}
        renderItem={({item}) => <NewFriendsListItem friendInfo={item} />}
        keyExtractor={(item, index) => item.uid}
        ListEmptyComponent={() => <Text>List Empty</Text>}
      />
    </View>
  ) : null;
};
FriendsNewRequest.proptypes = {
  newFriendRequestList: PropTypes.array,
};

const styles = StyleSheet.create({
  requestTextStyle: {
    fontSize: 16,
    backgroundColor: '#CFD8DC',
    color: '#212121',
    padding: 10,
  },
});
export default FriendsNewRequest;
