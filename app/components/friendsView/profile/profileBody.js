import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const ProfileBody = ({userProfile}) => {
  return (
    <View style={{flex: 1, zIndex: -1}}>
      <View
        style={{
          marginTop: 95,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 14}} numberOfLines={2} ellipsizeMode={'tail'}>
          {userProfile.aboutMe}
        </Text>
      </View>
    </View>
  );
};

ProfileBody.propTypes = {
  userProfile: PropTypes.object,
};

export default ProfileBody;
