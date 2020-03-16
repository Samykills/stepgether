import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import NewFriendsListItem from './newFriendsListItem';
import PropTypes from 'prop-types';
const FriendsNewRequest = ({newFriendRequestList}) => {
  return (
    newFriendRequestList.length && (
      <View>
        <Text style={[styles.requestTextStyle]}>New Requests!</Text>
        <FlatList
          data={newFriendRequestList}
          renderItem={({item}) => <NewFriendsListItem friendInfo={item} />}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    )
  );
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
