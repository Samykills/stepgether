import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {
  followAUser,
  ifCurrentUserIsFollower,
  getNewFollowersRequest,
  deleteCurrentUsersFollowRequest,
  unFollowAUser,
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
      } else if (!state.isFollower) {
        followAUser(userId).then(
          res => {
            setState({...state, isLoading: false, isRequested: true});
          },
          err => {
            setState({...state, isLoading: false});
          },
        );
      } else {
        unFollowAUser(userId).then(
          res => {
            setState({isFollower: false, isLoading: false, isRequested: false});
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
    Promise.all([
      ifCurrentUserIsFollower(userId),
      getNewFollowersRequest(userId),
    ]).then(res => {
      if (res[1]) {
        if (res.filter(item => item.uid == auth().currentUser.uid).length > 0) {
          setState({isFollower: res[0], isRequested: true, isLoading: false});
        }
      } else {
        setState({isFollower: res[0], isRequested: false, isLoading: false});
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
