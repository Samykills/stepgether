import React, {useReducer} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Button, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const LIKE = 'LIKE';
const PostCardFooter = ({postId, likes, comments, likedByUser}) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(
    (oldState, action) => {
      switch (action.type) {
        case LIKE:
          return {
            ...oldState,
            likes: action.payload.like,
            likedByUser: action.payload.likedByUser,
          };
        default:
          throw new Error();
      }
    },
    {
      likes: likes,
      likedByUser: likedByUser,
    },
  );

  const openCommentsView = () => {
    navigation.navigate('commentsView', {postId: postId});
  };

  const likeClicked = () => {
    let newLikes = state.likes;
    let newLikedByUser = state.likedByUser;
    if (state.likedByUser) {
      newLikes = newLikes - 1;
      newLikedByUser = false;
    } else {
      newLikes = newLikes + 1;
      newLikedByUser = true;
    }
    dispatch({
      type: LIKE,
      payload: {like: newLikes, likedByUser: newLikedByUser},
    });
  };

  return (
    <>
      <Divider />
      <View style={[styles.container]}>
        <FooterIcon
          value={state.likes}
          iconName={state.likedByUser ? 'like1' : 'like2'}
          iconType={'antdesign'}
          iconColor={state.likedByUser ? '#2196F3' : 'grey'}
          onPress={likeClicked}
        />
        <View style={[styles.divider]} />
        <FooterIcon
          value={comments}
          iconName={'chat'}
          iconType={'material'}
          iconColor={'grey'}
          onPress={openCommentsView}
        />
      </View>
    </>
  );
};

const FooterIcon = ({value, iconName, iconType, iconColor, onPress}) => (
  <Button
    icon={<Icon name={iconName} type={iconType} color={iconColor} />}
    iconRight
    title={value + ' '}
    titleStyle={{color: iconColor}}
    type={'clear'}
    onPress={onPress}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#000000FF',
  },
});

PostCardFooter.proptypes = {
  postId: PropTypes.number,
  likes: PropTypes.number,
  comments: PropTypes.array,
  likedByUser: PropTypes.bool,
};

export default PostCardFooter;
