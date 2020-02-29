import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import FriendListItem from './friendListItem';
import PropTypes from 'prop-types';

const FriendsList = ({friendsList}) => {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 16,
          backgroundColor: '#CFD8DC',
          color: '#212121',
          padding: 10,
        }}>
        Friends!
      </Text>
      <FlatList
        data={friendsList}
        renderItem={({item}) => <FriendListItem friendInfo={item} />}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  );
};
FriendsList.propTypes = {
  friendsList: PropTypes.array,
};
export default FriendsList;
