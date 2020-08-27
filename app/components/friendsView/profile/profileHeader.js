import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import StepgetherAvatar from '../../common/stepgetherAvatar';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import COLORS from '../../../theme/colors';
import AnimateNumber from 'react-native-animate-number';

const DETAIL_TYPE = {
  POSTS: 'Posts',
  FOLLOWERS: 'Followers',
  FOLLOWING: 'Following',
};
const ProfileHeader = ({userProfile}) => {
  return (
    <View style={[styles.headerContainer]}>
      <View style={[styles.avatar]}>
        <AnimatedCircularProgress
          size={90}
          width={3}
          fill={100}
          tintColor={COLORS.BLUE}
          children={() => (
            <StepgetherAvatar
              size={80}
              avatarType={userProfile.photoUrl}
              title={userProfile.displayName}
            />
          )}
        />
        <Text style={[styles.userName]}>{userProfile.displayName}</Text>
        <Text style={[styles.userName]}>{userProfile.emailId}</Text>
      </View>
      <View style={[styles.headerDetailsContainer]}>
        <AnimatedDetails
          value={288}
          detailType={DETAIL_TYPE.POSTS}
          onPress={() => {
            alert('lol');
          }}
        />
        <View style={[styles.details]}>
          <Text style={[styles.userName]}>120</Text>
          <Text style={[styles.userName]}>Followers</Text>
        </View>
        <View style={[styles.details]}>
          <Text style={[styles.userName]}>255</Text>
          <Text style={[styles.userName]}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const AnimatedDetails = ({value, detailType, onPressFunc}) => (
  <TouchableHighlight style={[styles.details]} onPress={onPressFunc}>
    <>
      <AnimateNumber
        style={[styles.userName]}
        value={value}
        formatter={val => {
          return Math.ceil(val);
        }}
      />
      <Text style={[styles.userName]}>{detailType}</Text>
    </>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  headerDetailsContainer: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  details: {justifyContent: 'center', alignItems: 'center'},

  avatar: {
    // alignItems: 'center',
  },
  userName: {fontSize: 14, marginTop: 10},
});
ProfileHeader.propTypes = {
  userProfile: PropTypes.object,
};
export default ProfileHeader;
