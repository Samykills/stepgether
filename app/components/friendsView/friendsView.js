import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import FriendsHeader from './friendsHeader';
import FriendsNewRequest from './friendsNewRequest';
import FriendsList from './friendsList';
import ErrorView from '../error';
import {subscribeToNewFollowersRequestCollection} from '../../firestore/firestoreFunctions';
const FriendsView = () => {
  const [newRequest, setNewRequest] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [loadingFailed, setLoadingFailed] = useState(false);
  useEffect(() => {
    const subscribe = subscribeToNewFollowersRequestCollection.onSnapshot(
      snapshot => {
        let newRequestsArr = [];
        snapshot.forEach(doc => {
          newRequestsArr.push(doc.data());
        });
        setNewRequest(newRequestsArr);
      },
      error => {
        setLoadingFailed(true);
      },
    );
    return () => subscribe();
  }, []);
  return loadingFailed ? (
    <ErrorView />
  ) : (
    <View style={[styles.container]}>
      <FriendsHeader />
      <FriendsNewRequest newFriendRequestList={newRequest} />
      <FriendsList friendsList={friendsList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

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
