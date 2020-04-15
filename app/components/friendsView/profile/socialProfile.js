import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from './profileHeader';
import ProfileBody from './profileBody';
import {getUserInfo} from '../../../firestore/userCollectionFirestoreFunctions';
const SocialProfile = props => {
  const {userInfo} = props.route.params;
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    getUserInfo(userInfo.uid).then(res => {
      setUserProfile(res);
    });
  }, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.container]}>
        <ProfileHeader userInfo={userInfo} />
        {userProfile ? <ProfileBody userProfile={userProfile} /> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});
SocialProfile.propTypes = {
  userInfo: PropTypes.object,
  userProfile: PropTypes.object,
};
export default SocialProfile;
