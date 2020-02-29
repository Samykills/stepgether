import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from './profileHeader';
import ProfileBody from './profileBody';
const SocialProfile = ({userProfile}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
      }}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <ProfileHeader userProfile={userProfile} />
        <ProfileBody userProfile={userProfile} />
      </ScrollView>
    </View>
  );
};
SocialProfile.propTypes = {
  userProfile: PropTypes.object,
};
export default SocialProfile;
