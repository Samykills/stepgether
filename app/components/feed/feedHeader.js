import React from 'react';
import {View, Platform} from 'react-native';
import StepgetherAvatar from '../common/stepgetherAvatar';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';

const FeedHeader = ({userDetails}) => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,height: 1
            },
            shadowOpacity: 0.6,
            shadowRadius: 5,
            zIndex: 1,
          },
          android: {
            elevation: 5,
          },
        }),
      }}>
      <StepgetherAvatar avatarType={userDetails.userImageUrl} />
      <Text style={{marginTop: 10, fontSize: 12}}>{userDetails.userName}</Text>
    </View>
  );
};

FeedHeader.propTypes = {
  userDetails: PropTypes.object,
};

export default FeedHeader;
