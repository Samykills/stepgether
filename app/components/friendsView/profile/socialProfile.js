import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from './profileHeader';
import ProfileBody from './profileBody';
const SocialProfile = ({userInfo, userProfile}) => {
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.scrollViewContainer]}>
        <ProfileHeader userInfo={userInfo} />
        <ProfileBody userProfile={userProfile} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
});
SocialProfile.propTypes = {
  userInfo: PropTypes.object,
  userProfile: PropTypes.object,
};
export default SocialProfile;
