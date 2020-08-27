import React, {useState, useEffect} from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from './profileHeader';
import ProfileBody from './profileBody';
import {getUserInfo} from '../../../firestore/userCollectionFirestoreFunctions';
import COLORS from '../../../theme/colors';
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
      {userProfile ? (
        <>
          <ProfileHeader userProfile={userProfile} />
          <ProfileBody userProfile={userProfile} />
        </>
      ) : (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator color={COLORS.BLUE} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
SocialProfile.propTypes = {
  userInfo: PropTypes.object,
  userProfile: PropTypes.object,
};
export default SocialProfile;
