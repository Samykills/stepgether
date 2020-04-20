import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import StepgetherAvatar from '../../common/stepgetherAvatar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';

const profileBackgroundImage =
  'http://new-cloudfront.zekkei-japan.jp/images/articles/871fd7574601ff2ada79c8fbb07e4917.jpg';
const ProfileHeader = ({userInfo}) => {
  return (
    <View>
      <FastImage
        style={[styles.headerImage]}
        source={{uri: profileBackgroundImage}}
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
              avatarType={userInfo.photoUrl}
              title={userInfo.displayName}
            />
          )}
        />
        <Text style={[styles.userName]}>{userInfo.displayName}</Text>
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
  userName: {fontSize: 22, marginTop: 10},
});
ProfileHeader.propTypes = {
  userInfo: PropTypes.object,
};
export default ProfileHeader;
