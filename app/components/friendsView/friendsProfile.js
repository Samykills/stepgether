import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SocialProfile from './profile/socialProfile';
const FriendsProfile = props => {
  const {userInfo} = props.route.params;
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    fetchUserProfileViaId(userInfo.uid).then(res => {
      setUserProfile(res);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <SocialProfile userInfo={userInfo} userProfile={userProfile} />
    </SafeAreaView>
  );
};

const fetchUserProfileViaId = userId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(UserProfileData);
    }, 2000);
  });
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const UserProfileData = {
  displayName: 'Warren Buffett',
  aboutMe: 'Your life is your message to the world, make sure its inspiring!!',
  photoUrl:
    'https://image.cnbcfm.com/api/v1/image/105894249-15572301173711u8a0015.jpg',
};

export default FriendsProfile;
