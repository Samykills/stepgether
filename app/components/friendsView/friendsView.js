import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PeopleSearch from './peopleSearch';
import FriendsNewRequest from './friendsNewRequest';
import FriendsList from './friendsList';
import ErrorView from '../error';
import {
  subscribeToNewFollowersRequestCollection,
  subscribeToFollowersListCollection,
} from '../../firestore/userCollectionFirestoreFunctions';
import {inject} from 'mobx-react';

const FriendsView = ({AuthStore}) => {
  const [newRequest, setNewRequest] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const {setUserFollowersList} = AuthStore;

  useEffect(() => {
    const subscribeNewFollowers = subscribeToNewFollowersRequestCollection().onSnapshot(
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

    return () => subscribeNewFollowers();
  }, []);

  useEffect(() => {
    const subscribeFollowersList = subscribeToFollowersListCollection().onSnapshot(
      snapshot => {
        let followersArr = [];
        snapshot.forEach(doc => {
          followersArr.push(doc.data());
        });
        setUserFollowersList(followersArr);
        setFollowersList(followersArr);
      },
      error => {
        setLoadingFailed(true);
      },
    );
    return () => subscribeFollowersList();
  }, []);

  return loadingFailed ? (
    <ErrorView />
  ) : (
    <View style={[styles.container]}>
      <PeopleSearch />
      <FriendsNewRequest newFriendRequestList={newRequest} />
      <FriendsList friendsList={followersList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

export default inject('AuthStore')(FriendsView);
