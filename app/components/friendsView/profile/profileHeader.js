import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import StepgetherAvatar from '../../common/stepgetherAvatar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const ProfileHeader = ({userProfile}) => {
  return (
    <View>
      <Image
        style={[styles.headerImage]}
        resizeMode={'cover'}
        source={{uri: userProfile.profileBackgroundImage}}
      />

      <View style={[styles.avatar]}>
        <AnimatedCircularProgress
          size={160}
          width={3}
          fill={100}
          tintColor={'blue'}
          children={() => (
            <StepgetherAvatar
              size={150}
              avatarType={userProfile.profileImageUrl}
              title={userProfile.name}
            />
          )}
        />
        <Text style={[styles.userName]}>{userProfile.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10},
  avatar: {
    position: 'absolute',
    left: '29%',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {fontSize: 18, marginTop: 10},
});
ProfileHeader.propTypes = {
  userProfile: PropTypes.object,
};
export default ProfileHeader;
