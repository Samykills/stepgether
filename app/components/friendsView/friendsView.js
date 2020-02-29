import React from 'react';
import {View} from 'react-native';
import FriendsHeader from './friendsHeader';
import FriendsNewRequest from './friendsNewRequest';
import FriendsList from './friendsList';

const FriendsView = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FriendsHeader />
      <FriendsNewRequest newFriendRequestList={Data.newFriendRequests} />
      <FriendsList friendsList={Data.friendsList} />
    </View>
  );
};
export default FriendsView;

const Data = {
  newFriendRequests: [
    {
      id: 1,
      name: 'Warren Buffett',
      imageUrl:
        'https://image.cnbcfm.com/api/v1/image/105894249-15572301173711u8a0015.jpg',
    },
    {
      id: 2,
      name: 'Mukesh Ambani',
      imageUrl:
        'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/07/13/704233-658425-635681-mukesh-ambani-reuters.jpg',
    },
    {
      id: 3,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
  ],
  friendsList: [
    {
      id: 1,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 2,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 3,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 4,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 5,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 6,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 7,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 8,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
    {
      id: 9,
      name: 'Ratan Tata',
      imageUrl:
        'https://cdn.techinasia.com/wp-content/uploads/2015/04/ratan-tata.jpg',
    },
  ],
};
