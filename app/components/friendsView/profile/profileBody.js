import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import FollowButton from './components/followButton';
const ProfileBody = ({userProfile}) => {
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.content]}>
        <Text style={[styles.emailId]}>{userProfile.emailId}</Text>
        <FollowButton userId={userProfile.uid} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, zIndex: -1},
  content: {
    flex: 1,
    marginTop: 95,
    alignItems: 'center',
  },
  emailId: {
    padding: 10,
  },
  aboutMe: {fontSize: 14},
});

ProfileBody.propTypes = {
  userProfile: PropTypes.object,
};

export default ProfileBody;
