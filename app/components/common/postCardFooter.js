import React, {useReducer} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Button} from 'react-native-elements';

const LIKE = 'LIKE';
const PostCardFooter = ({likes, comments, likedByUser}) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case LIKE:
          return {
            ...state,
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
    <View
      style={{
        height: 30,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <FooterIcon
        value={state.likes}
        iconName={state.likedByUser ? 'like1' : 'like2'}
        iconType={'antdesign'}
        iconColor={state.likedByUser ? '#2196F3' : 'grey'}
        titleColor={'grey'}
        onPress={likeClicked}
      />
      <View style={{width: 1, height: 30, backgroundColor: '#000000FF'}} />
      <FooterIcon
        value={comments.length}
        iconName={'chat'}
        iconType={'material'}
        iconColor={'grey'}
        titleColor={'grey'}
      />
    </View>
  );
};

const FooterIcon = ({
  value,
  iconName,
  iconType,
  iconColor,
  titleColor,
  onPress,
}) => (
  <Button
    icon={<Icon name={iconName} type={iconType} color={iconColor} />}
    iconRight
    title={value + ' '}
    titleStyle={{color: titleColor}}
    type={'clear'}
    onPress={onPress}
  />
);
PostCardFooter.proptypes = {
  likes: PropTypes.number,
  comments: PropTypes.array,
};
export default PostCardFooter;
