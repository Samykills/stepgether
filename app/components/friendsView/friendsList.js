import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import FriendListItem from './friendListItem';
import PropTypes from 'prop-types';

const FriendsList = ({friendsList}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.friendsHeaderText]}>Friends!</Text>
      <FlatList
        data={friendsList}
        renderItem={({item}) => <FriendListItem friendInfo={item} />}
        keyExtractor={(item, index) => item.uid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  friendsHeaderText: {
    fontSize: 16,
    backgroundColor: '#CFD8DC',
    color: '#212121',
    padding: 10,
  },
});
FriendsList.propTypes = {
  friendsList: PropTypes.array,
};
export default FriendsList;
