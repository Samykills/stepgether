import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {
  followAUser,
  ifCurrentUserIsFollower,
  getNewFollowersRequest,
  deleteCurrentUsersFollowRequest,
} from '../../../../firestore/firestoreFunctions';
import auth from '@react-native-firebase/auth';

const FollowButton = ({userId}) => {
  const [state, setState] = useState({
    isLoading: false,
    isFollower: false,
    isRequested: false,
  });

  const onPressFollowUser = () => {
    if (!state.isLoading) {
      setState({...state, isLoading: true});
      if (state.isRequested) {
        //cancel the request here
        deleteCurrentUsersFollowRequest(userId).then(
          res => {
            setState({...state, isLoading: false, isRequested: false});
          },
          err => {
            setState({...state, isLoading: false});
          },
        );
      } else {
        followAUser(userId).then(
          res => {
            setState({...state, isLoading: false, isRequested: true});
          },
          err => {
            setState({...state, isLoading: false});
          },
        );
      }
    }
  };

  useEffect(() => {
    setState({...state, isLoading: true});
    ifCurrentUserIsFollower(userId).then(res => {
      setState({...state, isFollower: res});
    });
    getNewFollowersRequest(userId).then(res => {
      if (res) {
        if (res.filter(item => item.uid == auth().currentUser.uid).length > 0) {
          setState({...state, isRequested: true, isLoading: false});
        }
      } else {
        setState({...state, isLoading: false});
      }
    });
  }, []);

  const title = state.isRequested
    ? 'Requested'
    : state.isFollower
    ? 'Following'
    : 'Follow';
  return (
    <Button
      title={title}
      raised
      onPress={onPressFollowUser}
      loading={state.isLoading}
    />
  );
};

FollowButton.propTypes = {
  userId: PropTypes.string,
};
export default FollowButton;
