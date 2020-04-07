import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import FriendsHeader from './friendsHeader';
import FriendsNewRequest from './friendsNewRequest';
import FriendsList from './friendsList';
import {inject, observer} from 'mobx-react';
import ErrorView from '../error';
import {getCurrentUserInfo} from '../../firestore/firestoreFunctions';
const FriendsView = ({AuthStore}) => {
  const {userInfo, setUserInfo} = AuthStore;
  const [loadingFailed, setLoadingFailed] = useState(false);
  useEffect(() => {
    getCurrentUserInfo().then(
      res => {
        setUserInfo(res);
      },
      err => {
        setLoadingFailed(true);
      },
    );
  }, []);
  return loadingFailed ? (
    <ErrorView />
  ) : (
    <View style={[styles.container]}>
      <FriendsHeader />
      {userInfo && userInfo.friends && (
        <FriendsNewRequest
          newFriendRequestList={userInfo.friends.newRequests}
        />
      )}
      {userInfo && userInfo.friends && (
        <FriendsList friendsList={userInfo.friends.list} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

export default inject('AuthStore')(observer(FriendsView));

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
