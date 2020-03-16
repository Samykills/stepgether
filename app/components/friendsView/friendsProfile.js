import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import SocialProfile from './profile/socialProfile';
const FriendsProfile = ({userId}) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    fetchUserProfileViaId(userId).then(res => {
      setUserProfile(res);
    });
  }, [userId]);

  const element = () => {
    return Object.entries(userProfile).length > 0 ? (
      <SocialProfile userProfile={userProfile} />
    ) : (
      <View style={[styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return <SafeAreaView style={[styles.container]}>{element()}</SafeAreaView>;
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
  name: 'Warren Buffett',
  aboutMe: 'Your life is your message to the world, make sure its inspiring!!',
  profileImageUrl:
    'https://image.cnbcfm.com/api/v1/image/105894249-15572301173711u8a0015.jpg',
  profileBackgroundImage:
    'http://new-cloudfront.zekkei-japan.jp/images/articles/871fd7574601ff2ada79c8fbb07e4917.jpg',
};

FriendsProfile.propTypes = {
  userId: PropTypes.string,
};

export default FriendsProfile;
