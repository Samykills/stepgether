import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ProfileBody = ({userProfile}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <Text style={[styles.aboutMe]} numberOfLines={2} ellipsizeMode={'tail'}>
          {userProfile.aboutMe}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, zIndex: -1},
  content: {
    marginTop: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutMe: {fontSize: 14},
});
ProfileBody.propTypes = {
  userProfile: PropTypes.object,
};

export default ProfileBody;
